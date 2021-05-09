const express = require('express');
const controllers = require('./controllers');

// creamos un manejador de rutas
const Router = express.Router();

Router.get('/', controllers.index)
    .post('/chat', controllers.validate, controllers.redirect);

module.exports = Router;