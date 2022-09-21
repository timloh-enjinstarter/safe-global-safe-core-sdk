import { SafeVersion } from '@timloh-enjinstarter/safe-global-safe-core-sdk-types'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { deployments, waffle } from 'hardhat'
import {
  getMultiSendCallOnlyContractDeployment,
  getMultiSendContractDeployment,
  getSafeContractDeployment,
  getSafeProxyFactoryContractDeployment
} from '../src/contracts/safeDeploymentContracts'
import { getContractNetworks } from './utils/setupContractNetworks'
import {
  getFactory,
  getMultiSend,
  getMultiSendCallOnly,
  getSafeSingleton
} from './utils/setupContracts'
import { getEthAdapter } from './utils/setupEthAdapter'
import { getAccounts } from './utils/setupTestNetwork'

chai.use(chaiAsPromised)

describe('Safe contracts', () => {
  const setupTests = deployments.createFixture(async ({ deployments }) => {
    await deployments.fixture()
    const accounts = await getAccounts()
    const chainId: number = (await waffle.provider.getNetwork()).chainId
    const contractNetworks = await getContractNetworks(chainId)
    return {
      accounts,
      contractNetworks,
      chainId
    }
  })

  describe('getSafeContract', async () => {
    it('should return an L1 Safe contract from safe-deployments', async () => {
      const { accounts } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const chainId = 97
      const singletonDeployment = getSafeContractDeployment(safeVersion, chainId)
      const safeContract = await ethAdapter.getSafeContract({
        safeVersion,
        chainId,
        singletonDeployment
      })
      chai
        .expect(await safeContract.getAddress())
        .to.be.eq('0x7b92f33E30285Eb770847E366F60492397830cc9')
    })

    it('should return an L2 Safe contract from safe-deployments', async () => {
      const { accounts } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const chainId = 97
      const singletonDeployment = getSafeContractDeployment(safeVersion, chainId)
      const safeContract = await ethAdapter.getSafeContract({
        safeVersion,
        chainId,
        singletonDeployment
      })
      chai
        .expect(await safeContract.getAddress())
        .to.be.eq('0x7b92f33E30285Eb770847E366F60492397830cc9')
    })

    it('should return an L1 Safe contract from safe-deployments using the L1 flag', async () => {
      const { accounts } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const chainId = 97
      const isL1SafeMasterCopy = true
      const singletonDeployment = getSafeContractDeployment(
        safeVersion,
        chainId,
        isL1SafeMasterCopy
      )
      const safeContract = await ethAdapter.getSafeContract({
        safeVersion,
        chainId,
        singletonDeployment
      })
      chai
        .expect(await safeContract.getAddress())
        .to.be.eq('0x772e7171476bA23734AC95F130e9211aA359A4BE')
    })

    it('should return a Safe contract from the custom addresses', async () => {
      const { accounts, contractNetworks, chainId } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const customContract = contractNetworks[chainId]
      const safeContract = await ethAdapter.getSafeContract({
        safeVersion,
        chainId,
        customContractAddress: customContract?.safeMasterCopyAddress,
        customContractAbi: customContract?.safeMasterCopyAbi
      })
      chai
        .expect(await safeContract.getAddress())
        .to.be.eq((await getSafeSingleton()).contract.address)
    })
  })

  describe('getMultiSendContract', async () => {
    it('should return a MultiSend contract from safe-deployments', async () => {
      const { accounts } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const chainId = 97
      const singletonDeployment = getMultiSendContractDeployment(safeVersion, chainId)
      const multiSendContract = await ethAdapter.getMultiSendContract({
        safeVersion,
        chainId,
        singletonDeployment
      })
      chai
        .expect(await multiSendContract.getAddress())
        .to.be.eq('0x15AFD9d2910604a61A62ABa9FB3cC0fa2adF8A00')
    })

    it('should return a MultiSend contract from the custom addresses', async () => {
      const { accounts, contractNetworks, chainId } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const customContract = contractNetworks[chainId]
      const multiSendContract = await ethAdapter.getMultiSendContract({
        safeVersion,
        chainId,
        customContractAddress: customContract.multiSendAddress,
        customContractAbi: customContract.multiSendAbi
      })
      chai
        .expect(await multiSendContract.getAddress())
        .to.be.eq((await getMultiSend()).contract.address)
    })
  })

  describe('getMultiSendCallOnlyContract', async () => {
    it('should return a MultiSendCallOnly contract from safe-deployments', async () => {
      const { accounts } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const chainId = 97
      const singletonDeployment = getMultiSendCallOnlyContractDeployment(safeVersion, chainId)
      const multiSendCallOnlyContract = await ethAdapter.getMultiSendCallOnlyContract({
        safeVersion,
        chainId,
        singletonDeployment
      })
      chai
        .expect(await multiSendCallOnlyContract.getAddress())
        .to.be.eq('0x4433e5b185a03B49B2e1C0c26ABED30775bbB1Ba')
    })

    it('should return a MultiSendCallOnly contract from the custom addresses', async () => {
      const { accounts, contractNetworks, chainId } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const customContract = contractNetworks[chainId]
      const multiSendCallOnlyContract = await ethAdapter.getMultiSendCallOnlyContract({
        safeVersion,
        chainId,
        customContractAddress: customContract.multiSendCallOnlyAddress,
        customContractAbi: customContract.multiSendCallOnlyAbi
      })
      chai
        .expect(await multiSendCallOnlyContract.getAddress())
        .to.be.eq((await getMultiSendCallOnly()).contract.address)
    })
  })

  describe('getSafeProxyFactoryContract', async () => {
    it('should return a SafeProxyFactory contract from safe-deployments', async () => {
      const { accounts } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const chainId = 97
      const singletonDeployment = getSafeProxyFactoryContractDeployment(safeVersion, chainId)
      const factoryContract = await ethAdapter.getSafeProxyFactoryContract({
        safeVersion,
        chainId,
        singletonDeployment
      })
      chai
        .expect(await factoryContract.getAddress())
        .to.be.eq('0xAE18fF924Dc76b70d3973181531261dEBF5142E8')
    })

    it('should return a SafeProxyFactory contract from the custom addresses', async () => {
      const { accounts, contractNetworks, chainId } = await setupTests()
      const [account1] = accounts
      const ethAdapter = await getEthAdapter(account1.signer)
      const safeVersion: SafeVersion = '1.3.0'
      const customContract = contractNetworks[chainId]
      const factoryContract = await ethAdapter.getSafeProxyFactoryContract({
        safeVersion,
        chainId,
        customContractAddress: customContract.safeProxyFactoryAddress,
        customContractAbi: customContract.safeProxyFactoryAbi
      })
      chai
        .expect(await factoryContract.getAddress())
        .to.be.eq((await getFactory()).contract.address)
    })
  })
})
