let express = require('express')
let app = express()
let dbConfig = require('./dbConfig');
app.use(express.static(__dirname))
//http服务器
app.listen(3002, () => { console.log(11111); })
let WebSocketServer = require('ws').Server
//用ws模块启动一个websocket服务器,监听了9999端口
let wsServer = new WebSocketServer({ port: 9999 })
//监听客户端的连接请求 当客户端连接服务器的时候，就会触发connection事件
//socket代表一个客户端,不是所有客户端共享的，而是每个客户端都有一个socket
wsServer.on('connection', function (socket) {
  //每一个socket都有一个唯一的ID属性
  // console.log(socket)
  console.log('客户端连接成功')
  //监听对方发过来的消息
  var i = 1
  socket.on('message', function (message) {
    console.log('接收到客户端的消息', message)
    let sql = 'select * from '
    setInterval(() => {
      dbConfig.sqlConnect()
      socket.send('服务器回应:' + message + i)
      i = i + 1
    }, 1000)
  })
})