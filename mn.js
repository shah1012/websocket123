const WebSocket = require("ws");
const Port = process.env.PORT || 5500;
const express = require("express");

const server = express().listen(Port, () => {
  console.log(`Running express server on ${Port}`);
});

const wss = new WebSocket.Server({ server: server });

wss.on("connection", (prt) => {
  console.log(`Wss server listening to port ${prt}`);
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
