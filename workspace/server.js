//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];
var catScore = [0,0,0,0,0];
// catScore.length = 5;


io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);

    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
    });


    socket.on('Pretty_Cat', function(data){
      console.log("me data" + data);
      console.log("helloo world" + JSON.stringify(catScore));
        catScore[data] = catScore[data] +  1;
        socket.emit('Cat_Score', catScore);
        
        
    });
    
   

});



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
