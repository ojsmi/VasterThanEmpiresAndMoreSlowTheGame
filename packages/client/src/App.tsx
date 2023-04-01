import {useMemo} from 'react';
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { getComponentValue, Has } from "@latticexyz/recs";

import { Terrain } from "./components/Terrain";
import { World } from "./components/World";
import { Player } from './components/Player';

import { worldData } from './data/worldData';



let nunonce = undefined;

const indexToXY = function( index, width ){
  return {
      x: index % width,
      y: Math.floor( index / width )
  }
}

const xyToIndex = function( x, y ){
  return x * y;
}


export const App = () => {
  const {
    components: { Gamefield, PlayerPos },
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

  const tiles = useComponentValue( Gamefield, singletonEntity);
  const playerPos = useComponentValue( PlayerPos, singletonEntity )

  return (
    <World width={80} height={80}> 
      <Terrain tiles={tiles} width={80} height={80}></Terrain> 
      <Player 
        pos={ indexToXY( playerPos, 80 ) }
        // onMove={ (x,y) => {
        //   xyToIndex( x, y );
        // }}
      />
    </World>
  );
};