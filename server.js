
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors());

// Serve static files
app.use(express.static('public'));
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join room', (room) => {
    socket.join(room);
    socket.room = room;
    console.log(`User ${socket.id} joined room ${room}`);
    socket.emit('message', `You joined room ${room}`);
  });

  socket.on('chat message', (msg) => {
    if (socket.room) {
      io.to(socket.room).emit('chat message', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
