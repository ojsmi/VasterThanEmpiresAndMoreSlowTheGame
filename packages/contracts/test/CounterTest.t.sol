// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/world/IWorld.sol";
import { CounterTable, CounterTableTableId } from "../src/tables/CounterTable.sol";
import { Gamefield } from "../src/tables/Gamefield.sol";

contract CounterTest is MudV2Test {
  IWorld world;
  uint8[] public c;

  function setUp() public override {
    super.setUp();
    world = IWorld(worldAddress);
  }

  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  // function testCounter() public {
  //   // Expect the counter to be 1 because it was incremented in the PostDeploy script.
  //   bytes32 key = bytes32("singleton");
  //   world.increment();
  //   uint32 counter = CounterTable.get(world, key);
  //   assertEq(counter, 1);
  // }

  //   // Expect the counter to be 2 after calling increment.
  //   world.increment();
  //   counter = CounterTable.get(world, key);
  //   assertEq(counter, 2);
  // }

  /// lenght dynamic array
  // function testMap() public {
  //   c.push(88);
  //   c.push(2);
  //   c.push(3);
  //   c.push(4);
  //   c.push(5);
  //   c.push(6);
  //   c.push(7);
  //   c.push(8);
  //   c.push(9);
  //   c.push(10);

    //uint8[]] memory test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    world.addMap(c);
    uint8[] memory tile = Gamefield.get(world);
    // console.log(tile[0]);
    //assertEq(keccak256(abi.encode(tile)), keccak256(abi.encode(test)));
    //console.log(tile);
  }

  // function testKeysWithValue() public {
  //   bytes32 key = bytes32("singleton");
  //   uint32 counter = CounterTable.get(world, key);
  //   bytes32[] memory keysWithValue = getKeysWithValue(world, CounterTableTableId, CounterTable.encode(counter));
  //   assertEq(keysWithValue.length, 1);
  // }
}
