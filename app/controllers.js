var users = require('./users');
const Mensaje = require('./chatmodule');

function index(req, res){
    res.render('index', {validated: true});
}


function redirect(req, res){
    if(req.validate) {
            loadMensajes()
        .then((mes)=>{
            res.render('chat',{mes});
        })
        .catch((error)=>{
            console.log(error);
        })
    }  else{
        return res.render('index', {validated: false});

    }
}

function validate(req, res, next){
    req.validate = false;
    if(users.indexOf(req.body.username) == -1) req.validate = true;
    next();
}


function loadMensajes(){

    return new Promise((resolve,reject)=>{
        try {
            let arrayMensajesdb =  Mensaje.find();
            resolve(arrayMensajesdb);
        } catch (error) {
            reject(error);
        }
    })
    
}

module.exports = {index, validate, redirect}