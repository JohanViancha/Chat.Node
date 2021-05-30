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


//Conexión a base datos
const mongoose = require('mongoose');
const user='johanviancha';
const password = 'RgYaVf6U6VCIaj5M';
const db = 'chat';
const uri = `mongodb://${user}:${password}@cluster0-shard-00-00.vesuc.mongodb.net:27017,cluster0-shard-00-01.vesuc.mongodb.net:27017,cluster0-shard-00-02.vesuc.mongodb.net:27017/${db}?ssl=true&replicaSet=atlas-103m93-shard-0&authSource=admin&retryWrites=true&w=majority`;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Base de datos conectada"))
    .catch(e=> console.log('Error al conectar '+ e));


require('./app/sockets')(io);

server.listen((process.env.PORT || 3000), ()=>{
    console.log("Servidor escuchando puerto");
});


