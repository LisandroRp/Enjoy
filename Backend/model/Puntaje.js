var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var puntajeSchema = new Schema({
    nombre:String,
    puntaje:float,
    usuarioId:String,
    fechaPuntaje:String,
    eventoId:String,
});

var Puntaje = mongoose.model('Puntaje', puntajeSchema);
console.log("se creo modelo Puntaje");
module.exports = Puntajes;