import express from "express";

const server = express();

server.all("/", (_, res) => {
  res.send("Bot is running!");
});

export default function keepAlive() {
  server.listen(3000, function () {
    console.log("Server is ready.");
  });
}
