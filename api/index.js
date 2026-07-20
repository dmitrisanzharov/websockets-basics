const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");

const PORT = 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });



wss.on("connection", (ws) => {
    console.log('client connected');

    


})


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});