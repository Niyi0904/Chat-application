const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUser, removeUser, getUser, getUserRoom} = require('./users');
const PORT = process.env.PORT || 5000;
const router = require('./router')



const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  socket.on('join', ({name, room}, callback) => {
    const { error, user} = addUser({id: socket.id, name, room});

    if (error) return callback(error);

    socket.emit('nessage', { user: 'admin', text:`${user}, welcome to the room ${user}`});
    socket.broadcast.to(user).emit('message', {user: 'admin', text:`${user}, has joined`});

    socket.join(user);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user).emit('message', { user: user, text:message });

    callback()
  });

  socket.on('disconnect', () => {
    console.log('user had left');
  })
})

app.use(cors());
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));