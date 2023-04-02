import {useMemo, useEffect, useState} from 'react';
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { getComponentValue, Has } from "@latticexyz/recs";

import { Terrain } from "./components/Terrain";
import { World } from "./components/World";
import { Player } from './components/Player';
import { Others } from './components/Others'; 

import { worldData } from './data/worldData';
import helpers from './helpers'; 


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

const updateWorld = ( tiles ) => {
  console.log('updateWorld()');
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
  if( valuesOfEffect.length > 0 ){
    const lowestTileValue = valuesOfEffect.reduce( (a,b) => Math.min( a, b ) );
    for( let i = 0; i < indicesOfEffect.length; i++ ){
      const index = indicesOfEffect[i];
      const value = currentWorld[index];
      if( value === lowestTileValue ){
        currentWorld[ index ] = 99;
      }
    }
  }
  return currentWorld;
}

interface Item {
  type: number,
  name: string
}


export const App = () => {
  const {
    components: { Gamefield, PlayerPos, LoadingState },
    playerEntity,
    singletonEntity,
    worldSend,
  } = useMUD();

  const dataToSend = worldData.slice(0,6400).map((item : Item) => {
        return item.type;
  });
  const playerStart = Math.floor( (dataToSend.length / 2 ?? 0) + helpers.gameW / 2 );

  const [creatingMap, setCreatingMap] = useState(false);
  const [settingPlayer, setSettingPlayer] = useState(false);
  const [hasPlacedSeed, setHasPlacedSeed] = useState( false );
  
  const tiles = useComponentValue(Gamefield, singletonEntity);
  const playerPos = useComponentValue( PlayerPos, playerEntity);
  const networkStatus = useComponentValue(LoadingState, singletonEntity)

  useEffect(() => {
    if(!playerPos && networkStatus?.state === 2 && tiles?.value?.length && tiles.value.length >= dataToSend.length && !settingPlayer) {
      setSettingPlayer(true)
      worldSend( "setPlayerPos", [ playerStart, {gasLimit: 1_000_000 }]);
    }
  }, [playerPos, networkStatus, tiles, settingPlayer])


  // TODO: update world
  // useEffect(() => {
  //   if( !tiles ) return () => {}; 
  //   const saveWorld = async () => {
  //     const currentWorld = updateWorld( tiles );
  //     console.log( 'update currentWorld on chain ' );
  //     return worldContract.addMap( currentWorld, {gasLimit: 10_000_000, gasPrice: 0 });       
  //   }
    
  //   saveWorld();    
  //   return () => {}
  // }, [ playerPos ])
  const BATCH_SIZE = 100;

  useEffect(() => {
    async function setup() {
      const dataToSend = worldData.slice(0,6400).map((item) => {
        return item.type;
      });
      for(let i = 0; i < Math.ceil(dataToSend.length / BATCH_SIZE); i++) {
        await worldSend("addMap", [dataToSend.slice(i * BATCH_SIZE, Math.min((i + 1) * BATCH_SIZE, dataToSend.length)), { gasLimit: 30_000_000}])
      }
    }
    if(!tiles && networkStatus?.state === 2 && !creatingMap) {
      setCreatingMap(true)
      setup()
    }
  }, [tiles, networkStatus, creatingMap] );
  
  useEffect(() => {
    let timeoutTimer = null;
    if( hasPlacedSeed ){
      timeoutTimer = setTimeout(function(){
        setHasPlacedSeed( false );
      }, 5500 );
    }
    return () => {
      clearTimeout( timeoutTimer );
    }
  }, [hasPlacedSeed])

  return (
    <>
    <World width={gameW} height={gameH}> 
      <Terrain tiles={tiles} width={gameW} height={gameH}></Terrain> 
      <Others />
      <Player dropped={hasPlacedSeed}/>      
    </World>
      <button
          type="button"
          style={{
            position: 'fixed',
            top: '3.5rem',
            left: '50%',
            transform: 'translateX( -50% )'
          }}
          onClick={async (event) => {            
            event.preventDefault();
            const seededWorld = [...tiles.value];
            //const playerSeedPos = Math.floor( seededWorld?.length / 2 ?? 0 ) + 40;
            seededWorld[ playerPos.value ] = 99;
            console.log( playerPos.value, seededWorld );
            await worldSend("addMap", [seededWorld, {gasLimit: 10_000_000 }]);
            setHasPlacedSeed( playerPos.value );
          }}
      >
        PLACE SEED
      </button>
    </>
  );
};