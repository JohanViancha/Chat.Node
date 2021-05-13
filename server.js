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

const mongoose = require('mongoose');
const user='johanviancha';
const password = 'RgYaVf6U6VCIaj5M';
const db = 'chat';
const uri = `mongodb+srv://${user}:${password}@cluster0.vesuc.mongodb.net/${db}?retryWrites=true&w=majority`;
console.log(uri);
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Base de datos conectada"))
    .catch(e=> console.log(e));


require('./app/sockets')(io);

server.listen((process.env.PORT || 3000), ()=>{
    console.log("Servidor escuchando puerto");
});


