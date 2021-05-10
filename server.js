// dependencias
const bodyParser = require('body-parser');
const express = require('express');

// definimos una instancia de express
const app = express();

// creamos servidor http con la instancia de express
const server = require('http').Server(app);

// importamos socket.io
const io = require('socket.io')(server);

// importamos el router que creamos en la carpeta app
const Router = require('./app/router');

// instancia para poder consumir Json
app.use(express.json());

// instancia para evitar problemas al enviar datos de formulario
app.use(express.urlencoded({extended: true}));

// nos llama archivos estaticos de la carpeta public
app.use(express.static('public'));

app.use('', Router);

// configuramos el motor de vistas
app.set('view engine', 'pug');

require('./app/sockets')(io);

const port = process.env.PORT || 3000;
server.listen(port, ()=>{
    console.log("Servidor escuchando puerto");
});