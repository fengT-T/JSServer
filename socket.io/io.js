module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('admin', function (data) {
      socket.join('admin')
    })
  })
}
