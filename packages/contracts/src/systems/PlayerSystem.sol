// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { console } from "forge-std/console.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { PlayerPos } from "../tables/PlayerPos.sol";

contract PlayerSystem is System {
  function setPlayerPos(uint32 index) public {
    PlayerPos.set(index);
  }

  function getPlayerPosition() public returns (uint32) {
    uint32 pos = PlayerPos.get();
    return pos;
  }

  function translatePos(uint32 value) public returns (uint32 x, uint32 y) {
    uint32 x = value % 80;
    uint32 y = value / 80;
    return (x, y);
  }

  function translateXY(uint32 x, uint32 y) public returns (uint32 pos) {
    uint32 pos = (y * 80) + x;
    return pos;
  }

  function getPOS() public returns (uint32 x, uint32 y) {
    uint32 pos;
    uint32 x;
    uint32 y;
    pos = PlayerPos.get();
    (x, y) = translatePos(pos);
    return (x, y);
  }

  function moveRight() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (x < 80) {
      x = x + 1;
    }
    uint32 pos = translateXY(x, y);
    PlayerPos.set(pos);
  }

  function moveLeft() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (x > 0) {
      x = x - 1;
    }
    uint32 pos = translateXY(x, y);
    PlayerPos.set(pos);
  }

  function moveUp() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (y > 0) {
      y = y - 1;
    }
    uint32 pos = translateXY(x, y);
    PlayerPos.set(pos);
  }

  function moveDown() public {
    uint32 x;
    uint32 y;
    (x, y) = getPOS();
    if (y < 80) {
      y = y + 1;
    }
    uint32 pos = translateXY(x, y);
    PlayerPos.set(pos);
  }

  // function plant(uint32 what, index) {}
}
