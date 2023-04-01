import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { getComponentValue, Has } from "@latticexyz/recs";
import { Tile } from "./components/Tile";
import { World } from "./components/World";
import { worldData } from './data/worldData';

export const App = () => {
  const {
    components: { Gamefield },
    singletonEntity,
    worldSend,
    world
  } = useMUD();

  //const tiles = useEntityQuery([Has(Gamefield)])
  //console.log( tiles )
  const tiles = worldData;
  const dataToSend = tiles.map((item) => {
    return item.type;
  });

  worldSend( "addMap", [ dataToSend, { gasLimit: 1_000_000 }]);


  return (
    <World>
    {
      tiles.map((tileEntity,i) => {
        return(
          //<span key={world.entities[tileEntity]}>{getComponentValue(Gamefield, tileEntity)?.value ?? ""}</span>
          <Tile id={tileEntity.type}></Tile>
        )
      })
    }
    </World>
  );
};