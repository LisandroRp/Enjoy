var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventoSchema = new Schema({
    nombre:{type:String, required:true},
    descripcion:{type:String, required:true},
    idUsuarioPropietario:{type:String, required:true},
    fecha:String,
    tipo:{type:String, required:true},
    genero:String,
    imagen:Buffer,
    duracion:Number,
    rating:Number,
    personas:Number,
    votos:[{type:Schema.Types.ObjectId, ref: 'Usuario'}],
    comentarios:[{type:Schema.Types.ObjectId, ref: 'Comentario'}],
    precios:[{type:Schema.Types.ObjectId, ref: 'Carta'}],
    precioE:Number
});

var Evento = mongoose.model('Evento', eventoSchema);
console.log("se creo modelo Evento");
module.exports = Evento;