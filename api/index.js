const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const wss = new WebSocketServer({ server });

// when a client connects
wss.on("connection", (ws) => {
    console.log('ws', ws);
    console.log("Client connected");

    // when client messages
    ws.on("message", (message) => {
        console.log("Message received:", message.toString());
    });

    // send message to client
    ws.send("Hello from server");

    // when client closes
    ws.on("close", () => {
        console.log("Client disconnected");
    });

    // secondary message for REACT state update demo
    setTimeout(() => {
        ws.send("Hello from server 2");
    }, 3000);


    // server disconnects from client
    // ws.close(1000, "Normal closure");

});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});