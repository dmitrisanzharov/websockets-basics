import { useEffect, useRef } from 'react';

const wsUrl = 'ws://localhost:4000';

function App() {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(wsUrl);
        console.log('ws', ws.current);

        // connect to server
        ws.current.onopen = () => {
            console.log('ws connected');

            ws?.current?.send('hello server, this is client XYZ'); // here we send message to server
        };

        ws.current.onclose = () => {
            console.log('ws closed');
        };

        ws.current.onmessage = (e) => {
            console.log('event', e);
            console.log('message from server', e.data);
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    return <div>WebSocket Test</div>;
}

export default App;
