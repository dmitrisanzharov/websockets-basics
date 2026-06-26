import { useEffect, useRef } from "react";

function App() {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:4000");

        // open connection with server
        ws.current.onopen = () => {
            console.log("Connected to server");
            ws.current?.send("Hello from client");
        };

        // receive message from server
        ws.current.onmessage = (event) => {
            console.log('event', event);
            console.log("Message from server:", event.data);
        };


        ws.current.onclose = (event) => {
            console.log('event', event);
            console.log("Disconnected from server");
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    console.log('ws', ws);

    return <div>WebSocket Test</div>;
}

export default App;
