const helpers = {
    gameW: 80,
    gameH: 80,
    indexToXY: function( index, width ){
        return {
            x: index % width,
            y: Math.floor( index / width )
        }
      },
     xyToIndex: function( x, y, width ){
        return (y * width) + x;
      }
}

export default helpers;