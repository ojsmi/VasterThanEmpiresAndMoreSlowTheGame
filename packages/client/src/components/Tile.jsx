import { TileTypes, TileTypeToName } from '../data/TileTypes';
import sand from "../../public/assets/img/sand.png";
import mud from "../../public/assets/img/mud.png";
import stone from "../../public/assets/img/stone.png";
import swamp from "../../public/assets/img/swamp.png";
import ocean from "../../public/assets/img/ocean.png";
import ice from "../../public/assets/img/ice.png";
import pando from "../../public/assets/img/pando.png";
import mycelium from "../../public/assets/img/mycelium.png";
import slime from "../../public/assets/img/slime.png";

import oceanGif from "../../public/assets/img/ocean.gif";
import pandoGif from "../../public/assets/img/pando.gif";
import sandGif from "../../public/assets/img/sand.gif";
import stoneGif from "../../public/assets/img/stone.gif";
import swampGif from "../../public/assets/img/swamp.gif";



export const Tile = ({id, type}) => {
    let img = sand;
    let hasAnim = false;
    if( TileTypeToName[id] === 'mud' ){
        img = mud;        
    }
    if( TileTypeToName[id] === 'stone' ){
        img = stone;
        hasAnim = stoneGif;
    }
    if( TileTypeToName[id] === 'swamp' ){
        img = swamp;
        hasAnim = swampGif;
    }
    if( TileTypeToName[id] === 'ocean' ){
        img = ocean;
        hasAnim = oceanGif;
    }
    if( TileTypeToName[id] === 'ice' ){
        img = ice;
    }
    if( TileTypeToName[id] === 'pando' ){
        img = pando;
        hasAnim = pandoGif;
    }
    if( TileTypeToName[id] === 'mycelium' ){
        img = mycelium;
    }
    if( TileTypeToName[id] === 'slime' ){
        img = slime;
    }
    return <div
        className={`vte-tile vte-tile__${id}`}
        style={{
            width: '1rem',
            height: '1rem',
            textAlign: 'center',
            lineHeight: '1rem',
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            position: 'relative'
        }}
    >
        {(hasAnim) ? <div className={`vte-tile-anim`}
            style={{
                width: '1rem',
                height: '1rem',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundImage: `url(${hasAnim})`,
                backgroundSize: 'cover'
            }}
        ></div> : <></>}
        <span 
            className="vte-tile-num"
            style={{
                display: 'none'
            }}
        >
            {id}
        </span>
    </div> 
}