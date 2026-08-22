const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
app.use(express.json());
const PORT = 4000;

const httpServer = http.createServer(app);

// WSS
const wss = new WebSocketServer({ server: httpServer });

const allClients = wss.clients;
console.log("allClients: ", allClients);

wss.on('connection', (ws) => {
    console.log('client connected');

    ws.send('server is saying HI!');

    ws.on('close', () => {
        console.log('connection closed');
    });

    ws.on('message', (message) => {
        console.log('the message: ', message.toString());
    });

    setTimeout(()=> {
        ws.send('server message 2')
    }, 3000)

    // setTimeout(()=> {
    //     ws.close(1000, 'server is saying: BYE BYE BYE')
    // }, 2000);

    // setInterval(() => {
    //     ws.ping();
    // }, 3000);

    // ws.on('pong', pong => {
    //     console.log('pong received', pong);
    // })
});

// REST
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
