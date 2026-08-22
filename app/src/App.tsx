import React from 'react';

const wsUrl = 'ws://localhost:4000';
function App() {
    const ws = React.useRef<WebSocket | null>(null);

    const [clientMessages, setClientMessages] = React.useState('');

    React.useEffect(() => {
        console.log('ws', ws.current);

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('client open');

            console.log('ws final', ws.current);
            console.log(Object.getPrototypeOf(ws.current));

            ws.current?.send('hello from CLIENT');

            // close
        };

        ws.current.onclose = (event) => {
            console.log('CLOSE event: ', event);
        };

        ws.current.onmessage = (event) => {
            console.log('message event', event);
            setClientMessages(event.data)
        };

        return () => {
            ws.current?.close();
        };

        // end of useEffect code
    }, []);

    return (
        <div>
            <h1>React app = {clientMessages}</h1>
        </div>
    );
}

export default App;
