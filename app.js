var net = require('net');

var sockets = [];

var server = net.Server(function(socket) {
    sockets.push(socket);

    socket.on('data', function(data){
        for (var i = 0; i < sockets.length; i++) {
            if(sockets[i] === socket){
                continue;
            }

            sockets[i].write(data);
        }
    });

    socket.on('end', function(){
        var i = sockets.indexOf(socket);
        sockets.delete(i, 1);
    });
});

console.log("Chat server started. Press CTRL + C to quit...\n")
server.listen(8000);