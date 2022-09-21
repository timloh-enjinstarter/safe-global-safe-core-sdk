import { execSync } from 'child_process'
import { existsSync, mkdirSync, readdir } from 'fs'
import path from 'path'

// Directories where the Typechain files will be generated
const outDirSrc = 'typechain/src/'
const typeChainDirectorySrcPath = path.join(__dirname, `../${outDirSrc}`)

const outDirBuild = 'dist/typechain/src/'
const typeChainDirectoryBuildPath = path.join(__dirname, `../${outDirBuild}`)

const outDirTests = 'typechain/tests/'

// Contract list for which the Typechain files will be generated
// Will be included in dist/ folder
const safeContractsPath = '../../node_modules/@timloh-enjinstarter/safe-global-safe-deployments/dist/assets'

const safeContracts_V1_3_0 = [
  `${safeContractsPath}/v1.3.0/gnosis_safe.json`,
  `${safeContractsPath}/v1.3.0/proxy_factory.json`,
  `${safeContractsPath}/v1.3.0/multi_send.json`,
  `${safeContractsPath}/v1.3.0/multi_send_call_only.json`
].join(' ')

// Won't be included in dist/ folder
const openZeppelinContractsPath = '../../node_modules/openzeppelin-solidity/build/contracts'
const testContracts = [
  `${openZeppelinContractsPath}/ERC20Mintable.json`
].join(' ')

// Remove existing Typechain files
execSync(`rimraf ${outDirSrc} ${outDirTests}`)

// Generate Typechain files
function generateTypechainFiles(
  typechainVersion: string,
  outDir: string,
  contractList: string
): void {
  execSync(`typechain --target ${typechainVersion} --out-dir ${outDir} ${contractList}`)
  console.log(`Generated typechain ${typechainVersion} at ${outDir}`)
}

// Copy Typechain files with the right extension (.d.ts -> .ts) allows them to be included in the build folder
function moveTypechainFiles(inDir: string, outDir: string): void {
  readdir(`${inDir}`, (error, files) => {
    if (error) {
      console.log(error)
    }
    if (!existsSync(`${outDir}`)) {
      mkdirSync(`${outDir}`, { recursive: true })
    }
    files.forEach((file) => {
      const pattern = /.d.ts/
      if (!file.match(pattern)) {
        return
      }
      execSync(`cp ${inDir}/${file} ${outDir}/${file}`)
    })
  })
}

const ethersV5 = 'ethers-v5'

// Src: Ethers V5 types
generateTypechainFiles(ethersV5, `${outDirSrc}${ethersV5}/v1.3.0`, safeContracts_V1_3_0)
moveTypechainFiles(
  `${typeChainDirectorySrcPath}${ethersV5}/v1.3.0`,
  `${typeChainDirectoryBuildPath}${ethersV5}/v1.3.0`
)

// Tests: Ethers V5 types
generateTypechainFiles(ethersV5, `${outDirTests}${ethersV5}`, testContracts)
