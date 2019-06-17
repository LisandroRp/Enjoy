var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventoSchema = new Schema({
    nombre:{type:String, required:true},
    descripcion:{type:String, required:true},
    idUsuarioPropietario:{type:String, required:true},
    fecha:{type:Date, default:Date.now()},
    tipo:{type:String, required:true},
    duracion:Number,
    puntajePromedio:Number,
    comentarios:[],
    puntaje:[],
    cartas:[{type:Schema.Types.ObjectId, ref: 'Carta'}],
    precios:[{
        nombre:String,
        descripcion:String,
        valor:Number,
    }]
});

var Evento = mongoose.model('Evento', eventoSchema);
console.log("se creo modelo Evento");
module.exports = Evento;