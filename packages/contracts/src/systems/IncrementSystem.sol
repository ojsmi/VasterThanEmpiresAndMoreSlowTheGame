// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { console } from "forge-std/console.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { CounterTable } from "../tables/CounterTable.sol";
import { Gamefield } from "../tables/Gamefield.sol";

contract IncrementSystem is System {
  function increment() public returns (uint32) {
    bytes32 key = bytes32(uint256(0x060D));
    uint32 counter = CounterTable.get(key);
    uint32 newValue = counter + 1;

    // Gamefield.set(keccak256("some.key"), 1);

    // uint8 retrived = Gamefield.get(keccak256("some.key"));
    console.log("HEY");
    //MyTable.set(keccak256("some.key"), 45, 13, field3);
    CounterTable.set(key, newValue);
    return newValue;
  }

  //no fixed
  function addMap(uint8[] memory data) public {
    console.log("hey");
    // uint8[10] memory arr;
    // for (uint8 d = 0; d < 10; d = d + 1) {
    //   arr[d] = test[d];
    // }
    Gamefield.set(data);
  }

  // function plant(uint32 what, index) {}
}
