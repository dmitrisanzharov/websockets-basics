const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const PORT = 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const allClients = wss.clients;
console.log("wss: ", wss);

wss.on('connection', (ws) => {
    console.log('============================');
    console.log('client connected');

    // on close
    ws.on('close', () => {
        console.log('---------------------------------');
        console.log('Client disconnected');
    });

    // on message
    ws.on('message', (message) => {
        console.log('Message from client:', message.toString());
    });

    // send message
    ws.send('Hello from server last message');

        setTimeout(() => {
        ws.send('Hello from server 1');
    }, 1000);

    setTimeout(() => {
        ws.send('Hello from server 2');
    }, 4000);

    // ws.close(1000, 'Goodbye');
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
