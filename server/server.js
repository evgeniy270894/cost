const express = require('express')
const UsersManager = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())

const usersManager = new UsersManager()

app.use(bodyParser.json())

app.post('/login', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  usersManager.loginUser(res, req.body.login)
})

app.get('/getCards', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  usersManager.getUserCards(res, req.query.login)
})

console.log("Started at :9003");
const server = app.listen(9003)

const io = require('socket.io')(server)

let messages = []

io.on('connection', function (socket) {
  if(messages.length > 0) {
    messages.map(msg => io.emit("MESSAGE", msg))
  }
  socket.on('SEND_MESSAGE', function (data) {
    messages.push(data)
    messages = messages.slice(-100)
    io.emit('MESSAGE', data)
  })
})
