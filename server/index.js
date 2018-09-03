const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Curse = require("./Curse");
const port = 80;

mongoose.connect('mongodb://mongo:27017/afentoe').then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/api", require("./modules.js")());

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({err: 'Something broke! ==> check that console ... of hoe ik ook proper kan zeggen dat er nog geen deftige errorhandler middleware implemented is'});
})




// FE
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