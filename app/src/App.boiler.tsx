import { useEffect, useRef } from "react";


function App() {
   const ws = useRef<WebSocket | null>(null);


   useEffect(() => {
       ws.current = new WebSocket("ws://localhost:4000"); // here is the Express / server socket address - NOTE: WS in the thingy


       ws.current.onopen = () => {
           console.log("Connected to server");
           ws.current?.send("Hello server");
       };


       ws.current.onmessage = (event) => {
           console.log("Message from server:", event.data);
       };


       ws.current.onclose = () => {
           console.log("Disconnected");
       };


       return () => {
           ws.current?.close();
       };
   }, []);


   console.log('ws', ws);


   return <div>WebSocket Test</div>;
}


export default App;
