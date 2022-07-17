import { Server } from "Socket.IO";
export default function socketHandler(req, res) {
  if (req.socket.server.io);
  else {
    const io = new Server(req.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
    });
  }
  res.end();
}
