// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { console } from "forge-std/console.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { PlayerPos } from "../tables/PlayerPos.sol";

contract PlayerSystem is System {
  function setPlayerPos(uint32 index) public {
    PlayerPos.set(index);
  }

  function translateXY(uint32 value) public returns (uint32 x, uint32 y) {
    uint32 x = value % 80;
    uint32 y = value / 80;
    return (x, y);
  }

  function translateXY(uint32 x, uint32 y) public returns (uint32 pos) {
    uint32 pos = (y * 80) + x;
    return pos;
  }

  function getPOS() public returns (uint32 x, uint32 y) {
    uint32 x;
    uint32 y;
    (x, y) = translateXY(PlayerPos.get());
  }

  function moveRight() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (x < 80) {
      uint32 newX = x + 1;
    }
    uint32 pos = translateXY(newX, y);
    PlayerPos.set(pos);
  }

  function moveLeft() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (x > 0) {
      uint32 newX = x - 1;
    }
    uint32 pos = translateXY(newX, y);
    PlayerPos.set(pos);
  }

  function moveUp() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (y > 0) {
      uint32 newY = y - 1;
    }
    uint32 pos = translateXY(x, newY);
    PlayerPos.set(pos);
  }

  function moveUp() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (y < 80) {
      uint32 newY = y + 1;
    }
    uint32 pos = translateXY(x, newY);
    PlayerPos.set(pos);
  }

  // function plant(uint32 what, index) {}
}
