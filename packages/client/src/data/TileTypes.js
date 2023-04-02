export const TileTypes = {
    SAND: 0,
    MUD: 1,
    STONE: 2,
    SWAMP: 3,
    OCEAN: 4,
    ICE: 5,
    PANDO: 6
}

export const TileTypeToName = {};
TileTypeToName[ TileTypes.DUST ] = 'sand';
TileTypeToName[ TileTypes.SAND ] = 'mud';
TileTypeToName[ TileTypes.STONE ] = 'stone';
TileTypeToName[ TileTypes.MIST ] = 'swamp';
TileTypeToName[ TileTypes.WATER ] = 'ocean';
TileTypeToName[ TileTypes.ICE ] = 'ice';
TileTypeToName[ TileTypes.PLANT ] = 'pando';

export const CharToTileType = {};
CharToTileType['-'] = TileTypes.SAND;
CharToTileType['.'] = TileTypes.MUD;
CharToTileType['='] = TileTypes.STONE;
CharToTileType['+'] = TileTypes.SWAMP;
CharToTileType['*'] = TileTypes.OCEAN;
CharToTileType['#'] = TileTypes.ICE;
CharToTileType['&'] = TileTypes.PANDO;