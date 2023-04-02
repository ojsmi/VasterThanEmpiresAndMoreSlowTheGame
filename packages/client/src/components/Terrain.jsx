import { Tile } from "./Tile";

export const Terrain = ({tiles, width, height}) => {
    return (
        <div
            className={`vte-terrain`}
            style={{
                width: `${width}rem`,
                height: `${height}rem`,
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            {tiles?.value.map(( tileEntity, i) => {        
                return(          
                    <Tile key={i} id={tileEntity} ></Tile>        
                );
            })}
        </div>
    )
}