exports.board = [];

exports.xTiles = 8;
exports.yTiles = 8;

exports.setupGame = function () {

    for (var y = 0; y < exports.yTiles; y++) {

        exports.board.push([]);

        for (var x = 0; x < exports.xTiles; x++) {
          
            exports.board[y].push(false);
          
        }
        
    }

}

exports.updateBoard = function (x, y, state) {

    exports.board[y][x] = state;

    SendToAll("push-board-update", { x: x, y: y, state: state });

}

