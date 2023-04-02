import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { getComponentValue, getComponentValueStrict, Has } from "@latticexyz/recs";

import { useMUD } from "../MUDContext";
import helpers from "../helpers";
import { useEffect, useState } from "react";

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
                        width: `.33rem`,
                        height: `.33rem`,
                        position: 'absolute',
                        left: `${posXY.x + .33 }rem`,
                        top: `${posXY.y + .33 }rem`,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,255,0,0.5)'
                    }}
                >{otherPosition}</div>)
            })
    )
}