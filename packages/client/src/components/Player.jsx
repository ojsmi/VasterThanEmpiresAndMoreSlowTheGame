import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import helpers from "../helpers";
import { useEffect, useState } from "react";

export const Player = ( {dropped} ) => {
    const {
        components: { PlayerPos },
        playerEntity,
        world,
        worldSend
    } = useMUD();
    const playerPos = useComponentValue( PlayerPos, playerEntity );
    

    useEffect(() => {
        const moveListener = async ( e ) => {        
            //console.log('e.key = ', e.key );                 
            if( e.key === 'w' || e.key === 'ArrowUp' ){                
                await worldSend( "moveUp", [{gasLimit: 1_000_000 }]);
            }
            if( e.key ==='a' || e.key === 'ArrowLeft'  ){                
                await worldSend( "moveLeft", [{gasLimit: 1_000_000 }]);
            }
            if( e.key ==='s' || e.key === 'ArrowDown'  ){                
                await worldSend( "moveDown", [{gasLimit: 1_000_000 }]);
            }
            if( e.key ==='d' || e.key === 'ArrowRight' ){                
                await worldSend( "moveRight", [{gasLimit: 1_000_000 }]);
            }            
        }        
        window.addEventListener( 'keydown', moveListener );
        return () => {
            window.removeEventListener( 'keydown', moveListener );
        }
    }, []);

    if(!playerPos) {
        return <></>
    }
    return (
        <div
            className={`vte-player`}
            style={{
                width: `1rem`,
                height: `1rem`,
                position: 'absolute',
                left: `${helpers.indexToXY( playerPos.value, helpers.gameW ).x}rem`,
                top: `${helpers.indexToXY( playerPos.value, helpers.gameW ).y}rem`,
                backgroundImage: (dropped) ? 'url("public/assets/img/mycelium-placed.gif")' : 'url("public/assets/img/cursor.gif")',
                backgroundSize: 'contain'
            }}
        ></div>
    )
}