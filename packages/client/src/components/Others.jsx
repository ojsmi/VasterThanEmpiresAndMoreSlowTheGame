import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { getComponentValue, getComponentValueStrict, Has } from "@latticexyz/recs";

import { useMUD } from "../MUDContext";
import helpers from "../helpers";
import { useEffect, useState } from "react";

import otherCursor from "../../public/assets/img/other-player.gif"

const Other = () => {

}

export const Others = () => {
    const {
        components: { PlayerPos },
        singletonEntity,
        playerEntity,
        worldSend
    } = useMUD();

    const others = useEntityQuery([Has(PlayerPos)]);

    return (
        others
            .map( (id) => { 
                if( id !== playerEntity ){
                    return getComponentValueStrict( PlayerPos, id ).value 
                }
                return false;
            })
            .filter( (value) => !!value )
            .map( ( otherPosition ) => {
                const posXY = helpers.indexToXY( otherPosition, helpers.gameW );
                return (<div
                    className={`vte-player`}
                    style={{
                        width: `1rem`,
                        height: `1rem`,
                        position: 'absolute',
                        left: `${posXY.x}rem`,
                        top: `${posXY.y}rem`,
                        //borderRadius: '50%',
                        //backgroundColor: 'rgba(0,255,0,0.5)'
                        backgroundImage: `url("${otherCursor}")`,
                        backgroundSize: 'contain'
                    }}
                ></div>)
            })
    )
}