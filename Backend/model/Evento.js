var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventoSchema = new Schema({
    nombre:String,
    descripcion:String,
    IdUsuarioPropietario:String,
    fecha:String,
    puntajePromedio:float,
    comentarios:[],
    puntaje:[],
    cartaPrecios:Carta,
});

var Evento = mongoose.model('Evento', eventoSchema);
console.log("se creo modelo Evento");
module.exports = Evento;