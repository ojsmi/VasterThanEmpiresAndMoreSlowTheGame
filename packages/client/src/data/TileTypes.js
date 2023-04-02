export const TileTypes = {
    SAND: 0,
    MUD: 1,
    STONE: 2,
    SWAMP: 3,
    OCEAN: 4,
    ICE: 5,
    PANDO: 6,
    MYCELIUM: 99,
    SLIME: 98
}

export const TileTypeToName = {};
TileTypeToName[ TileTypes.SAND ] = 'sand';
TileTypeToName[ TileTypes.MUD ] = 'mud';
TileTypeToName[ TileTypes.STONE ] = 'stone';
TileTypeToName[ TileTypes.SWAMP ] = 'swamp';
TileTypeToName[ TileTypes.OCEAN ] = 'ocean';
TileTypeToName[ TileTypes.ICE ] = 'ice';
TileTypeToName[ TileTypes.PANDO ] = 'pando';
TileTypeToName[ TileTypes.MYCELIUM ] = 'mycelium';
TileTypeToName[ TileTypes.SLIME ] = 'slime';

export const CharToTileType = {};
CharToTileType['-'] = TileTypes.SAND;
CharToTileType['.'] = TileTypes.MUD;
CharToTileType['='] = TileTypes.STONE;
CharToTileType['+'] = TileTypes.SWAMP;
CharToTileType['*'] = TileTypes.OCEAN;
CharToTileType['#'] = TileTypes.ICE;
CharToTileType['&'] = TileTypes.PANDO;