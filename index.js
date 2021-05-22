const express = require("express");
const ws = require("ws");
const game = require("./game.js");



function SendToAll(eventName, data) {

    wsServer.clients.forEach(client => {

        if (client.readyState === ws.OPEN) {

            client.emit(eventName, data);

        }

    });

}



var app = express();

game.setupGame();



const wsServer = new ws.Server({ noServer: true });

wsServer.on("connection", socket => {

    socket.emit("setup-game", { xTiles: game.xTiles, yTiles: game.yTiles, board: game.board } );

    socket.on("update-board", game.updateBoard);

});



app.use(express.static("assets"));



const expressServer = app.listen(80);

expressServer.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit("connection", socket, request);
    });
});

