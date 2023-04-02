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


export const Tile = ({id, type}) => {
    let img = sand;
    if( TileTypeToName[id] === 'mud' ){
        img = mud;
    }
    if( TileTypeToName[id] === 'stone' ){
        img = stone;
    }
    if( TileTypeToName[id] === 'swamp' ){
        img = mud;
    }
    if( TileTypeToName[id] === 'ocean' ){
        img = ocean;
    }
    if( TileTypeToName[id] === 'ice' ){
        img = ice;
    }
    if( TileTypeToName[id] === 'pando' ){
        img = pando;
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
            backgroundSize: 'cover'
        }}
    >
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