import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/api/create-room', (req,res)=>{
  res.json({roomId: nanoid(8)});
});

io.on('connection', (socket)=>{
  socket.on('join', ({roomId})=>{
    socket.join(roomId);
  });
  socket.on('message', ({roomId,text})=>{
    io.to(roomId).emit('message',{text});
  });
});

server.listen(3000, ()=> console.log('running http://localhost:3000'));