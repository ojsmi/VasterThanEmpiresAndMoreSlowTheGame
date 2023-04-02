// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { console } from "forge-std/console.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { CounterTable } from "../tables/CounterTable.sol";
import { Gamefield } from "../tables/Gamefield.sol";

contract IncrementSystem is System {
  function increment() public returns (uint32) {
    // bytes32 key = bytes32(uint256(0x060D));
    bytes32 key = keccak256(abi.encodePacked(block.number, _msgSender()));
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
  // function addMap(uint8[] memory data) public {
  //   for(uint256 i; i < data.length; i++){
  //     Gamefield.push(data[i]);
  //   }
  // }
  function setTile(uint32 key, uint32 value) public {
    bytes32 newKey = keccak256(abi.encodePacked(key));
    Gamefield.set(newKey, value);
  }

  // function setTilesArray(uint32[10] keys,uint32[10] values){

  // }

  function getTile(uint32 key) public view returns (uint32) {
    bytes32 newKey = keccak256(abi.encodePacked(key));
    uint32 val = Gamefield.get(newKey);
    return val;
  }

  // function plant(uint32 what, index) {}
}
