const express = require("express");
const ws = require("ws");

var app = express();

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", socket => {
    socket.on("message", message => console.log(message));
});

app.get("/", function(request, response) {

    response.send("Hello World!");

});

const expressServer = app.listen(80);

expressServer.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit("connection", socket, request);
    });
});