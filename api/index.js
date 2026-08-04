const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const PORT = 4000;

app.use(express.json());

const httpServer = http.createServer(app);

const wss = new WebSocketServer({ server: httpServer });

function parseTheMessage(message) {
    return message.toString();
}

// ws stuff
wss.on('connection', (ws) => {
    console.log('============================');
    console.log('client connected');

    ws.send('hello from server');

    setTimeout(() => {
        ws.send('hello from server 2 seconds after');
    }, 2000);

    ws.on('close', () => {
        console.log('client disconnected');
    });

    ws.on('message', (message) => {
        console.log(parseTheMessage(message));
    });

    ws.on('pong', () => {
        console.log('pong received');
    });

    setInterval(() => {
        console.log('ping sent');
        ws.ping();
    }, 3000);

    // setTimeout(() => {
    //     ws.close(1000, 'omg closed');
    // }, 3000);

    // end of ws code
});

// Rest api
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
