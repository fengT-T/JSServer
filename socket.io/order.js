const IO = require('koa-socket-2')
const order = new IO({
  namespace: 'order'
})

order.on('message', (ctx, data) => {
  console.log('client sent data to message endpoint', data)
})

module.exports = order
