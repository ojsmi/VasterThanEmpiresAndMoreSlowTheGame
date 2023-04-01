import {useMemo} from 'react';
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { getComponentValue, Has } from "@latticexyz/recs";
import { Tile } from "./components/Tile";
import { World } from "./components/World";
import { worldData } from './data/worldData';

let nunonce = undefined;

export const App = () => {
  const {
    components: { Gamefield },
    singletonEntity,
    worldSend,
    worldContract
  } = useMUD();
  
  //console.log( tiles )
  //const tiles = worldData;

  useMemo(async () => {
    console.log( '----> SEND ')
    const correctNonce = await worldContract.signer.getTransactionCount()
    nunonce ??= correctNonce;
    
    const dataToSend = worldData.slice(0,6400).map((item) => {
      return item.type;
    });
    worldContract.addMap( dataToSend, {gasLimit: 10_000_000, gasPrice: 0, nonce: nunonce });
    // worldSend( "addMap", [[18], { gasLimit: 1_000_000 }]);
    nunonce++;
        
  }, [] );

  const tiles = useComponentValue(Gamefield, singletonEntity);


  // console.log( 'Gamefield', Gamefield );
  // //const tiles = useEntityQuery([Has(Gamefield)])
  // const tiles = useEntityQuery([Has(Gamefield)]);
  //   console.log('-----')
  //   console.log('-----')
  //   console.log('-----')

  //   console.log( val );

  //   console.log('-----')
  //   console.log('-----')
  //   console.log('-----')

  return (
    <World width={80} height={80}>
      {/* <span>{val?.value ?? "?"}</span> */}
    {
      tiles?.value.map((tileEntity,i) => {        
        return(
          //<span key={world.entities[tileEntity]}>{getComponentValue(Gamefield, tileEntity)?.value ?? ""}</span>
          <Tile id={tileEntity}></Tile>
          //<></>
        )
      })
    }
    </World>
  );
};