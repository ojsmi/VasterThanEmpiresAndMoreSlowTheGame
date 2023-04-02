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

    useEffect( () => {
        console.log('<Player>, playerPos = ', playerPos );
        if( playerPos ){            
            setPos( helpers.indexToXY( playerPos.value, helpers.gameW ) );
        }
    }, [ playerPos ] );

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