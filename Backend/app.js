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
    imagen:'',
    rating:5,
    personas:2,
    votos:[],
    comentarios:[],
    precios:[],
    precioE:2500
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
    imagen:'',
    rating:5,
    personas:2,
    votos:[],
    comentarios:[],
    precios:[],
    precioE:2500
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