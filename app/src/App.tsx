import React, { useEffect, useRef } from 'react';

function App() {

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:4000");
    }, []);



  return (
    <div>
      <h1>React app</h1>
    </div>
  );
}

export default App;
