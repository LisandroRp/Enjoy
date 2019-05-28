var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre:String,
    apellido:String,
    email:String,
    usuarioId:String,
    password:String
});

var Usuarios = mongoose.model('Usuario', usuarioSchema);
console.log("se creo modelo Usuario");
module.exports = Usuarios;