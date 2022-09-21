// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import { GnosisSafeProxyFactory } from "@timloh-enjinstarter/safe-global-safe-contracts-v1.3.0/contracts/proxies/GnosisSafeProxyFactory.sol";
import { GnosisSafe } from "@timloh-enjinstarter/safe-global-safe-contracts-v1.3.0/contracts/GnosisSafe.sol";
import { MultiSend } from "@timloh-enjinstarter/safe-global-safe-contracts-v1.3.0/contracts/libraries/MultiSend.sol";
import { MultiSendCallOnly } from "@timloh-enjinstarter/safe-global-safe-contracts-v1.3.0/contracts/libraries/MultiSendCallOnly.sol";

contract ProxyFactory_SV1_3_0 is GnosisSafeProxyFactory {}
contract GnosisSafe_SV1_3_0 is GnosisSafe {}
contract MultiSend_SV1_3_0 is MultiSend {}
contract MultiSendCallOnly_SV1_3_0 is MultiSendCallOnly {}
