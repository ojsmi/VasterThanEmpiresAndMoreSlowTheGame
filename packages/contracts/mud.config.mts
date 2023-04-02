import { mudConfig, resolveTableId } from "@latticexyz/cli";

export default mudConfig({
  overrideSystems: {
    IncrementSystem: {
      fileSelector: "increment",
      openAccess: true,
    },
  },
  tables: {
    CounterTable: {
      fileSelector: "counter",
      schema: {
        value: "uint32",
      },
    },
    Gamefield: {
      fileSelector: "gamefield",
      primaryKeys: {},
      schema: {
        value: "uint8[]"
      },
    },
    PlayerPos: {
      fileSelector: "playerpos",
      primaryKeys: {
        player: "address"
      },
      schema: {
        value: "uint32"
      },
    },    
  },
  modules: [
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("CounterTable")],
    },
  ],
});
