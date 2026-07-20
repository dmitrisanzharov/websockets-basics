import express from "express";
import http from "http";
import { WebSocketServer } from "ws";


const app = express();
const server = http.createServer(app);


const wss = new WebSocketServer({ server });


wss.on("connection", (ws) => {
   console.log("Client connected");


   ws.send("Hello from server");


   ws.on("message", (msg) => {
       console.log("Received:", msg.toString());


       ws.send(`Echo: ${msg}`);
   });


   ws.on("close", () => {
       console.log("Client disconnected");
   });
});


server.listen(4000, () => {
   console.log("Server running on http://localhost:3001");
});
