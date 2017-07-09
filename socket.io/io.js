module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('admin', function (data) {
      socket.join('admin')
    })
    socket.on('chatWithUser', function (data) {
      try {
        io.sockets.sockets[data.from].emit('chat', data)
      } catch (e) {
        console.log()
      }
    })
    socket.on('chatWithAdmin', function (data) {
      socket.to('admin').emit('chat', data)
    })
  })
}
