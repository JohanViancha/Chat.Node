const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mensajeSchema = new Schema({
    username:String,
    message:String
})

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;