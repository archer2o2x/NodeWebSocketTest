var socket = io.connect(window.location.origin);

var board = [];

var xTiles;
var yTiles;

var tileWidth;
var tileHeight;

socket.on("setup-game", (data) => {

  xTiles = data.xTiles;

  yTiles = data.yTiles;

  tileWidth = width / xTiles;

  tileHeight = height / yTiles;

  board = data.board;

});

socket.on("push-board-update", (data) => {

  board[data.x][data.y] = data.state;

});



function setup() {

  createCanvas(400, 400);
  
  noStroke();
  
}



function mousePressed() {
  
  if ( x < 0 ) { return; }
  if ( x > width ) { return; }
  if ( y < 0 ) { return; }
  if ( y > height ) { return; }
  
  var x = floor(mouseX / tileWidth);
  var y = floor(mouseY / tileHeight);
  
  socket.emit("update-board", { x: x, y: y, state: !board[x][y] } );
  
}



function draw() {
  background(128);
  
  for (var x = 0; x < board.length; x++) {
    
    for (var y = 0; y < board[x].length; y++) {
      
      if (board[x][y]) {
        
        fill(255);
        
      } else {
        
        fill(0);
        
      }
      
      rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
      
    }
    
  }
  
}