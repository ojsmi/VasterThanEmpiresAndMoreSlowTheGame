// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/world/IWorld.sol";
import { CounterTable, CounterTableTableId } from "../src/tables/CounterTable.sol";
import { Gamefield } from "../src/tables/Gamefield.sol";
import { PlayerSystem } from "../src/systems/PlayerSystem.sol";

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

  // function testMove() public {
  //   world.setPlayerPos(40);
  //   (uint32 posXv, uint32 posYv) = world.translatePos(40);
  //   console.log(posXv);
  //   console.log(posYv);
  //   (uint32 posX, uint32 posY) = world.getPOS();
  //   console.log(posX);
  // }

  // function testTranslateXY() public {
  //   uint32 pos = world.translateXY(20, 20);
  //   assertEq(pos, 1620);
  // }

  // function testTranslatePos() public {
  //   uint32 x;
  //   uint32 y;
  //   (x, y) = world.translatePos(1620);
  //   assertEq(x, 20);
  //   assertEq(y, 20);
  // }

  // function testSetPos() public {
  //   uint32 pos;
  //   world.setPlayerPos(1620);
  //   pos = world.getPlayerPosition();
  //   assertEq(pos, 1620);
  // }

  // function testgetPos() public {
  //   uint32 x;
  //   uint32 y;
  //   world.setPlayerPos(1620);
  //   (x, y) = world.getPOS();
  //   assertEq(x, 20);
  //   assertEq(y, 20);
  // }

  // function testMoveRight() public {
  //   uint32 x;
  //   uint32 y;
  //   world.setPlayerPos(1620);
  //   (x, y) = world.getPOS();
  //   assertEq(x, 20);
  //   assertEq(y, 20);
  //   world.moveRight();
  //   (x, y) = world.getPOS();
  //   assertEq(x, 21);
  //   assertEq(y, 20);
  // }

  // function testMoveLeft() public {
  //   uint32 x;
  //   uint32 y;
  //   world.setPlayerPos(1620);
  //   (x, y) = world.getPOS();
  //   assertEq(x, 20);
  //   assertEq(y, 20);
  //   world.moveLeft();
  //   (x, y) = world.getPOS();
  //   assertEq(x, 19);
  //   assertEq(y, 20);
  // }

  // function testMoveUp() public {
  //   uint32 x;
  //   uint32 y;
  //   world.setPlayerPos(1620);
  //   (x, y) = world.getPOS();
  //   assertEq(x, 20);
  //   assertEq(y, 20);
  //   world.moveUp();
  //   (x, y) = world.getPOS();
  //   assertEq(x, 20);
  //   assertEq(y, 19);
  // }

  // function testMoveDown() public {
  //   uint32 x;
  //   uint32 y;
  //   world.setPlayerPos(1620);
  //   (x, y) = world.getPOS();
  //   assertEq(x, 20);
  //   assertEq(y, 20);
  //   world.moveDown();
  //   (x, y) = world.getPOS();
  //   assertEq(x, 20);
  //   assertEq(y, 21);
  // }

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
  function testMap() public {
    string memory data = vm.readFile("./all-data.json");
    //uint256[] memory arr = vm.parseJsonUintArray(data, "numbers");
    //console.log(arr[0]);
    // c.push(88);
    // c.push(2);
    // c.push(3);
    // c.push(4);
    // c.push(5);
    // c.push(6);
    // c.push(7);
    // c.push(8);
    // c.push(9);
    // c.push(10);

    //uint8[]] memory test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //world.addMap(c);
    //uint8[] memory tile = Gamefield.get(world);
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
