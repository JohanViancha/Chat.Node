$(document).ready(function(){
  //  var socket = io('https://chatgrupal.herokuapp.com/');
    var socket = io('http://localhost:3000/');
    username(socket);
    updateUsers(socket);
    newMessage(socket);
    updateMessages(socket);
    writeword(socket);

    verificaAncho();
});

// obtenemos el nombre de usuario registrado en localStorage
function username(socket){
    socket.emit('username', {
        username: localStorage.username
    })
}

function updateUsers(socket){
    
    socket.on('updateUsers', function(data){
        $("#users").html('');
        
        for(var i = 0; i < data.users.length; i++){
            let html = '';
            html += '<li class="list-group-item user">';
            html += '<i class="me-2 fa fa-circle text-success"></i>'+data.users[i];+'</li>';
            $('#users').append(html);      
        }
    })
}
 
function newMessage(socket){
    

    $("#message").keydown(function (e) { 
        console.log($("#message").val().length);
        if($("#message").val().length ==2){
            socket.emit('writeword', {usuario:localStorage.username,estado:1});
        }else if($("#message").val().length <=1){
            socket.emit('writeword', {usuario:localStorage.username,estado:2});
        }   
    });
    
    $('#message').keydown(function(e){
        if(e.keyCode == 13){
            // prevenimos evento por defecto que es dar salto de linea
            e.preventDefault();
            $('#send-msg-form').submit();
        }
    });
    $('#send-msg-form').submit(function(e){

        // prevenimos evento por defecto que es enviar el formulario
        e.preventDefault();
        socket.emit('newMessage', {
            username: localStorage.username,
            color: localStorage.color,
            message: $('#message').val()
        });
         socket.emit('writeword', {usuario:localStorage.username,estado:2});
        document.querySelector('#send-msg-form').reset();        
        
    });
    
 
}



function writeword(socket){ 
   

    socket.on('writeword', function(data){

        
        if(data.estado == 1){
            if(data.usuario != localStorage.username){
                console.log(data.usuario + " escribio");
                $("#container #escribir").append(`<p class="p-write">${data.usuario} está escribiendo</p>`);
                    
            }
        }else  if(data.estado == 2){
            if(data.usuario != localStorage.username){
                $("#container #escribir p").remove();
            }
        }
 
        
    });

 }


function updateMessages(socket){
    socket.on('updateMessages', function(data){
        let html = '';
        if(data.username == localStorage.username){
            html += '<div class="card w-50 mb-2 my-msg">';
            html += '<div class="card-header" style="background:#00fff3"> Tú </div>';
            html += '<div class="card-body"><p class="card-text">' + data.message + '</p></div>';
            html += '</div>';
        }else{
            html += '<div class="card w-50 mb-2 your-msg">';
            html += '<div class="card-header" style="background:'+data.color+'">' + data.username + ' </div>';
            html += '<div class="card-body"><p class="card-text">' + data.message + '</p></div>';
            html += '</div>';
            $("#audio")[0].play();
        }
        $('#msg-list').append(html);
        $("#messages").scrollTop($('#messages').prop("scrollHeight"));
    });

   
}


$(window).resize(function(){
  verificaAncho();
});

function verificaAncho(){
    if($(window).width()<=900){
        $("#user-list").hide();
        $("#messages").addClass("col-12");
    }
    if($(window).width()>900){
        $("#user-list").show();
        $("#messages").removeClass("col-12");
        $("#messages").addClass("col-8");

    }
}