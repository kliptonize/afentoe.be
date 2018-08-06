var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Curse = require("./Curse");

server.listen(3001);
app.use("/", express.static(path.join(__dirname, '../static/build')));

// This is what we'll be using
io.on('connection', function (socket) {
  // A new user connected to our socket, send latest curse back  
  socket.emit('curse.update', Curse.getCurse());

  // Event: we have a new curse send by someone on the front-end
  socket.on('curse.new', function(data){
    // Set new curse
    Curse.setCurse(data);

    // Send this new curse to everyone
    io.emit('curse.update', Curse.getCurse());
  })
});