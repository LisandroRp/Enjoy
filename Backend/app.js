// Importo express
var express = require('express');
// Importo Body Parser
var bodyParser = require('body-parser');
var cors = require('cors');
// Inicializo el server express
var app = express();

// Importo driver
var mongoose = require('mongoose');
// Conectar BD
var urlBD = 'mongodb://localhost/dbEventos';
// Opciones conexion
var opts = {useNewUrlParser:true, connectTimeoutMS:20000};

//Pruebo conexion
mongoose.connect(urlBD,opts).then
(
    () => {
            mongoose.Promise = global.Promise;
            console.log("Conectado a dbEventos!!");
          }, //se conecto
    err => { 
            console.log("ERROR:" + err); 
           } //manejo error
);

// Importo router
var apiRoutes = require("./api-routes")

// Uso Api routes en App
app.use('/apiAppEventos', apiRoutes);

// Todo lo que recibe la app se tratara como json
app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Setup server port
var port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Ejecuntando en el puerto " + port);
});

// Send message for default URL
app.get('/', (req, res) => res.send('Backend Activo'));

/************ Test ***********/
/*var Evento = require('./model/Evento');

var acdcEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'AC/DC',
    descripcion:'Banda de Rock de...',
    fecha: '24/06/20',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:120,
    genero:'Rock',
    imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkzHiLqaw3MedLtDd7EPKBlqhPW1IJE9jRFC1je3lLo79mDQ-',
    rating:5,
    personas:2,
    votos:[],
    comentarios:[],
    precios:[],
    precioE:5000,
    ubicacion: 'Estadio Unico de la Plata',
    latitude:'',
    longitude:''
});

acdcEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento guardado con exito.');
});

var cafresEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Los Cafres',
    descripcion:'Banda de Reggae de...',
    fecha: '14/06/19',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:160,
    genero:'Reggae',
    imagen:'data:image/jpeg;base64,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',
    rating:3,
    personas:2,
    votos:[],
    comentarios:[],
    precios:[],
    precioE:2500,
    ubicacion: 'Gran Rex',
    latitude:'',
    longitude:''
});

cafresEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento guardado con exito.');
});

var Usuario = require('./model/Usuario');

var usuario1 = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Gonzalo',
    apellido:'Fernandez',
    username:'gonza_fer',
    email:'gonza89@gmail.com',
    password:'12345678'
});

usuario1.save(function(err) {
    if (err) throw err;
        
    console.log('Usuario guardado con exito.');
});

var usuario2 = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Matias',
    apellido:'Pepe',
    username:'matu_pe',
    email:'matu_pe@gmail.com',
    password:'12345678'
});

usuario2.save(function(err) {
    if (err) throw err;
        
    console.log('Usuario guardado con exito.');
});*/