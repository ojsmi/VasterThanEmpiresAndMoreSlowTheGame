// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

interface IPlayerSystem {
  function setPlayerPos(uint32 index) external;

  function getPlayerPosition() external returns (uint32);

  function translatePos(uint32 value) external returns (uint32, uint32);

  function translateXY(uint32 x, uint32 y) external returns (uint32);

  function getPOS() external returns (uint32, uint32);

  function moveRight() external;

  function moveLeft() external;

  function moveUp() external;

  function moveDown() external;
}
