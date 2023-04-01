import {useMemo} from 'react';
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { getComponentValue, Has } from "@latticexyz/recs";

import { Terrain } from "./components/Terrain";
import { World } from "./components/World";
import { Player } from './components/Player';

import { worldData } from './data/worldData';



let nunonce = undefined;


const gameW = 80;
const gameH = 80;

const indexToXY = function( index, width ){
  return {
      x: index % width,
      y: Math.floor( index / width )
  }
}

const xyToIndex = function( x, y, width ){
  return (y * width) + x;
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
  const playerPos = Math.floor( tiles?.length / 2 ?? 0 );//useComponentValue( PlayerPos, singletonEntity );


  return (
    <>
    <World width={gameW} height={gameH}> 
      <Terrain tiles={tiles} width={gameW} height={gameH}></Terrain> 
      <Player 
        pos={ indexToXY( playerPos, gameW ) }
        // onMove={ (x,y) => {
        //   xyToIndex( x, y );
        // }}
      />
    </World>
      <button
          type="button"
          onClick={async (event) => {            
            event.preventDefault();
            const seededWorld = [...tiles.value];
            const playerSeedPos = Math.floor( seededWorld?.length / 2 ?? 0 ) + 40;
            seededWorld[playerSeedPos] = 99;
            console.log( playerSeedPos, seededWorld );
            await worldContract.addMap( seededWorld, {gasLimit: 10_000_000, gasPrice: 0 });                
          }}
      >
        PLACE SEED
      </button>
      <button
          type="button"
          onClick={async (event) => {
            event.preventDefault();
            const currentWorld = [...tiles.value];
            const indicesOfEffect = [];
            const valuesOfEffect = [];
            for( let i = 0; i < currentWorld.length; i++ ){
              if( currentWorld[i] === 99 ){
                const tilePos = indexToXY( i, gameW );   
                const xStart = (tilePos.x - 1 < 0) ? 0 : tilePos.x - 1;
                const xEnd = (tilePos.x + 1 > gameW ) ? gameW : tilePos.x + 1;
                const yStart = (tilePos.y - 1 < 0) ? 0 : tilePos.y - 1;
                const yEnd = (tilePos.y + 1 > gameW ) ? gameH : tilePos.y + 1;

                for( let x = xStart; x < xEnd + 1; x++ ){
                  for( let y = yStart; y < yEnd + 1; y++ ){
                    const index = xyToIndex( x, y, gameW );                    
                    if( index !== i ){
                      indicesOfEffect.push( index )
                      valuesOfEffect.push( currentWorld[index] );
                      //currentWorld[ index ] = 98;
                    }
                  }
                }
              }
            }
            const lowestTileValue = valuesOfEffect.reduce( (a,b) => Math.min( a, b ) );
            for( let i = 0; i < indicesOfEffect.length; i++ ){
              const index = indicesOfEffect[i];
              const value = currentWorld[index];
              if( value === lowestTileValue ){
                currentWorld[ index ] = 99;
              }
            }
            
            await worldContract.addMap( currentWorld, {gasLimit: 10_000_000, gasPrice: 0 }); 
            console.log('UPDATE DONE');            
          }}
      >
        RUN LOGIC
      </button>
    </>
  );
};