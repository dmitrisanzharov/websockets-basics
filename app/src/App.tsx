import React, { useEffect, useRef } from 'react';

const wsUrl = "ws://localhost:4000";

function App() {

    const ws = useRef<WebSocket | null>(null);

    const [wsMessage, setWsMessage] = React.useState<string>("");

    useEffect(() => {
        ws.current = new WebSocket(wsUrl);

        console.log('ws', ws.current);

        // open connection
        ws.current.onopen = () => {
            console.log("Connected to server");

            ws.current?.send("Hello to server from client");
           
        };


        ws.current.onmessage = (event) => {
            console.log("Message from server:", event);
            setWsMessage(event.data);
        }

        ws.current.onclose = (e) => {
            console.log("Disconnected from server", e.reason);
        }


        // close connection code
        return () => {
            ws.current?.close();
        }

    }, []);



  return (
    <div>
      <h1>React app: {wsMessage}</h1>
    </div>
  );
}

export default App;
