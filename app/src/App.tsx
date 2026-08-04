import React, { useRef } from 'react';

function App() {

    const [text, setText] = React.useState('no connection')

    const ws = useRef<WebSocket | null>(null);

    React.useEffect(() => {
        ws.current = new WebSocket('ws://localhost:4000');

        console.log('ws', ws.current);

        ws.current.onopen = (e) => {
            console.log('we are connected to server', e);

            ws.current?.send('FROM CLIENT TO SERVER: connection established on client side, here is message');
        };

        ws.current.onmessage = (event) => {
            console.log('============================');
            console.log('event', event);
            console.log('message', event.data);
            setText(event.data)
        };

        ws.current.onclose = (e) => {
            console.log('============================');
            console.log('e', e);
            console.log('message', e.reason);
        };

        return () => {
            ws?.current?.close();
        };
    }, []);

    return (
        <div>
            <h1>React app: {text}</h1>
        </div>
    );
}

export default App;
