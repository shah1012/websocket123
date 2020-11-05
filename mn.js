const WebSocket = require("ws");
const Port = process.env.PORT || 5500;

const wss = new WebSocket.Server({ port: Port });

wss.on("listening", (PORT) => {
  console.log(`[Server] listening on port 5500`);
});

wss.on("connection", (ws) => {
  console.log("New Client Connected");

  ws.on("close", () => {
    console.log("Client Disconnected");
  });

  ws.on("message", (data) => {
    console.log(`[Server] client has passed ${data}`);

    //broadcasting
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
        console.log(client);
      } else {
        console.log(client !== ws);
      }
    });
  });
});
