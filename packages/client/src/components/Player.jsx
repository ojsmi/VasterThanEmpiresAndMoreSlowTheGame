import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import helpers from "../helpers";
import { useEffect, useState } from "react";

export const Player = () => {
    const {
        components: { PlayerPos },
        singletonEntity,
        worldSend
    } = useMUD();

    const [pos, setPos] = useState({x: 0, y: 0 });
    const playerPos = useComponentValue( PlayerPos, singletonEntity );
    

    useEffect(() => {
        const moveListener = async ( e ) => {
            console.log( 'keydown', e );
            // console.log( playerPos );
            // const pos = indexToXY( playerPos?.value ?? 0, gameW );    
            console.log('pos', pos );
            let makeTransaction = false;
            const p = {
                x: pos.x,
                y: pos.y
            }
            console.log( 'p', p );
            if( e.key === 'w' ){
                makeTransaction = true;
                p.y -= 1;
            }
            if( e.key ==='a' ){
                makeTransaction = true;
                p.x -= 1;
            }
            if( e.key ==='s' ){
                makeTransaction = true;
                p.y += 1;
            }
            if( e.key ==='d' ){
                makeTransaction = true;
                p.x += 1;
            }
            if( makeTransaction ){
                p.x = Math.max( 0, p.x );
                p.x = Math.min( helpers.gameW, p.x );
                p.y = Math.max( 0, p.y );
                p.y = Math.min( helpers.gameH, p.y );
                const resultIndex = helpers.xyToIndex( p.x, p.y, helpers.gameW );
                console.log( 'resultIndex:', resultIndex );
                //await worldContract.setPlayerPos( resultIndex, {gasLimit: 10_000_000, gasPrice: 0 });
                await worldSend( "setPlayerPos", [ resultIndex, {gasLimit: 1_000_000 }]);
                console.log('player moved');
            }
        }        
        window.addEventListener('keydown', moveListener)
        return () => {
            window.removeEventListener( 'keydown', moveListener );
        }
    }, [pos]);

    useEffect( () => {
        console.log('<Player>, playerPos = ', playerPos );
        if( playerPos ){
            setPos( helpers.indexToXY( playerPos.value, helpers.gameW ) );
        }
    }, [playerPos] );

    return (
        <div
            className={`vte-player`}
            style={{
                width: `1rem`,
                height: `1rem`,
                position: 'absolute',
                left: `${pos.x}rem`,
                top: `${pos.y}rem`,
                borderRadius: '50%',
                backgroundColor: 'lime'
            }}
        ></div>
    )
}