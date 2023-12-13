const { WebSocketServer } = require('ws');
const uuid = require('uuid');


function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  
  let connections = [];
  let clickCount = 0;

  wss.on('connection', (ws) => {
    // Listen for messages from clients
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'click') {
        // Increment the click count and broadcast to all connected clients
        clickCount++;
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({ type: 'clickCount', count: clickCount }));
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
