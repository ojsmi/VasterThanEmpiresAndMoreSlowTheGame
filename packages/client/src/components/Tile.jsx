import { TileTypes, TileTypeToName } from '../data/TileTypes';

export const Tile = ({id, type}) => {
    return <div
        className={`vte-tile vte-tile__${id}`}
        style={{
            width: '1rem',
            height: '1rem',
            textAlign: 'center',
            lineHeight: '1rem',
            backgroundImage: `url(/public/assets/img/${TileTypeToName[id]}.png)`,
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