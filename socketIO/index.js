var io = require('socket.io')();

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('xevent', function (data) {
    console.log(data);
  });
});

module.exports=io;