var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname,"public")));
app.get('/', function(req, res) {
    res.send("ok");
//    res.sendFile(path.join(__dirname,"public","index.html"));
});
// users = [];
const account = [];
io.on('connection', function(socket){
    console.log("a user connected");
    socket.on('setusername',function(data)
    {
         console.log(data);
        // users.push(data);
        socket.broadcast.emit('broadcast',{username: data + ' joined the chat'});
        socket.emit('userset',{username: data});
        account[socket.id] = data;
    });

    

    socket.on('msg',function(data){
        socket.broadcast.emit('newmsg',data);
    });

    socket.on('disconnect', function(data)
     {      
         console.log('user disconnected!');
         socket.broadcast.emit('left',{name: account[socket.id]});
     });
     });
   

http.listen(3000, function() {
   console.log('listening on *:3000');
});


