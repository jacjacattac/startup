const { WebSocketServer } = require('ws');
const uuid = require('uuid');


function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    console.log('Upgrade event received');
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  let clickCount = 0;
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    console.log('connected to websocket');
    connections.push(connection);

    // Listen for messages from clients
    ws.on('message', (message) => {
        console.log('Message received:', message.type);
      const data = JSON.parse(message);
      if (data.type === 'click') {
        // Increment the click count and broadcast to all connected clients
        clickCount++;
        console.log("click count updated")
        wss.clients.forEach((client) => {
            console.log("click count sent:", clickCount )
            client.send(JSON.stringify({ type: 'click', count: clickCount }));
        });
      }
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connections.alive = true;
    });



  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

  
});
}

module.exports = { peerProxy };
