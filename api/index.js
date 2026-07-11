const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();

app.use(express.json());

const server = http.createServer(app);
const PORT = 4000;
const wss = new WebSocketServer({ server });

// WS server stuff
wss.on('connection', (ws) => {
    console.log('client connected');

    // send message to client that server is listening on connect
    ws.send('server is listening on connect');

    // when client send message
    ws.on('message', (msg) => {
        console.log('client message', msg.toString());

        // respond to client that message received
        ws.send('message received on server side after client message');
    });

    setTimeout(() => {
        ws.send('message from server 1');
    }, 1500);

    setTimeout(() => {
        ws.send('message from server 2');
    }, 3000);

    // when client disconnect message server
    ws.on('close', () => {
        console.log('client disconnected');
    });

    // ws.close(1000, 'Normal closure');
});

// HTTP server
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
