// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { console } from "forge-std/console.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { PlayerPos } from "../tables/PlayerPos.sol";

contract PlayerSystem is System {
  function setPlayerPos(uint32 index) public {
   
    PlayerPos.set(index);
  }

  // function plant(uint32 what, index) {}
}
