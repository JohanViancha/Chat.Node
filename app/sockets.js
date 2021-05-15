var users = require('./users');
var Mensaje = require('./chatmodule');
module.exports = function(io){
    io.on('connection', function(socket){
        addUser(socket);
        disconnectUser(socket);
        newMessage(socket);
        writeword(socket);
    });
}


function addUser(socket){
       socket.on('username', function(data){
            socket.username = data.username;
            users.push(data.username);
            updateUsers(socket);

        }); 
    
}

function updateUsers(socket){
    socket.emit('updateUsers', {users});
    socket.broadcast.emit('updateUsers', {users});
}

function disconnectUser(socket){
    socket.on('disconnect', function(){
        if(socket.username){
            users.splice(users.indexOf(socket.username), 1);
        }
        updateUsers(socket);
    });
}


function saveMessage(data){
    return new Promise((resolve,reject)=>{
        const messagedb = new Mensaje({username: data.username, message:data.message});
        resolve(messagedb.save());
    })
}


function newMessage(socket){
    socket.on('newMessage', function(data){
        saveMessage(data)
            .then(datamessage=>{
                socket.emit('updateMessages', data);
                socket.broadcast.emit('updateMessages', data);   
            });
        
    })
}


function writeword(socket){
    socket.on('writeword', function(data){
    socket.emit('writeword', data);
    socket.broadcast.emit('writeword', data);
    });
}

