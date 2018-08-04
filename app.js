var express = require('express');
var socket = require('socket.io');
const path = require('path')
const PORT = process.env.PORT || 5000

// App setup
var app = express();
var server =app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
//var server = app.listen(4000, function(){
//    console.log('listening for requests on port 4000,');
//});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('chat',function(data){
    	io.sockets.emit('chat',data);
    });
    socket.on('typing',function(data){
    	socket.broadcast.emit('typing',data);
    });

});
