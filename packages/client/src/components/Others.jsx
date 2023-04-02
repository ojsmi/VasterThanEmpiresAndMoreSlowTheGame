import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { Has } from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import helpers from "../helpers";
import { useEffect, useState } from "react";

const Other = () => {

}

export const Others = () => {
    const {
        components: { PlayerPos },
        singletonEntity,
        worldSend
    } = useMUD();

    const others = useEntityQuery([Has(PlayerPos)]);    

    return (
        others.map( ( o ) => {
            return (<div
                className={`vte-player`}
                style={{
                    width: `1rem`,
                    height: `1rem`,
                    position: 'absolute',
                    left: `${20}rem`,
                    top: `${20}rem`,
                    borderRadius: '50%',
                    backgroundColor: 'blue'
                }}
            >{o.value}</div>)
        })
    )
}