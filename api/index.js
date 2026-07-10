const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");

const app = express();

app.use(express.json());

const server = http.createServer(app);
const PORT = 4000;
const wss = new WebSocketServer({ server });

// WS server stuff



// HTTP server
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});