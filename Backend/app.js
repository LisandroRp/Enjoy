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

// Setup server port
var port = process.env.PORT || 8080;

// Todo lo que recibe la app se tratara como json
app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Importo router
var apiRoutes = require("./api-routes")
// Uso Api routes en App
app.use('/apiAppEventos', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Ejecutando en el puerto " + port);
});

// Send message for default URL
app.get('/', (req, res) => res.send('Backend Activo'));

/************ Test ***********/
/*var Evento = require('./model/Evento');

var lollaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Lolla Palooza',
    descripcion:'Terrible festival....',
    fecha: '24/03/20',
    tipo:'Festival',
    idUsuarioPropietario:'Time4Fun',
    duracion:'3 Dias',
    genero:'Variado',
    imagen:'https://www.radiocantilo.com/wp-content/uploads/2018/03/descarga.png',
    rating:5,
    personas:0,
    precioE:2500,
    precios: [{nombre:'Entrada general', precio:'2500'},{nombre:'VIP', precio:'3500'},{nombre:'Agua 500ml', precio:'120'},{nombre:'Gaseosa lata', precio:'100'},{nombre:'Hamburguesa', precio:'280-320'}],
    ubicacion: 'Hipodromo de San Isidro, San Isidro',
    latitude:-34.480023,
    longitude:-58.507587
});

lollaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+lollaEvento.nombre+' guardado con exito.');
});

var disneyEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Disney on Ice',
    descripcion:'Conquista tus Sueños',
    fecha:'26/07/20',
    tipo:'Show',
    idUsuarioPropietario:'Disney',
    duracion:'2 Horas',
    genero:'Infantil',
    imagen:'https://3.bp.blogspot.com/-1vhb8Umidi4/W5h3sofRJLI/AAAAAAAAbPY/vQbqIZJ0jrU3AhUXuNTva-geRYg5YHuSwCLcBGAs/s1600/IMG_8624.JPG',
    rating:5,
    personas:0,
    precioE:850,
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

disneyEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+disneyEvento.nombre+' guardado con exito.');
});

var wweEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'WWE Live Buenos Aires',
    descripcion:'Las estrellas de WWE regresan a Argentina!',
    fecha:'06/09/20',
    tipo:'Show',
    idUsuarioPropietario:'WWE',
    duracion:'2 Horas',
    genero:'Pelea',
    imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXnF2ecEQydigrd4PYoJtQ7PO4SsPyCsKL_YpVVOXJJV1-Q4D50w',
    rating:3.5,
    precioE:1000,
    personas:0,
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

wweEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+wweEvento.nombre+' guardado con exito.');
});

var tiniEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Tini Quiero Volver Tour',
    descripcion:'Tini llega al Luna Park para presentar su segunda gira "Quiero Volver Tour"',
    fecha:'18/10/20',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:'2 Horas',
    genero:'Pop',
    imagen:'https://i.pinimg.com/originals/4a/6d/38/4a6d388d62d2797947eb1f5f396314b9.jpg',
    rating:4.5,
    personas:0,
    precioE:700,
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

tiniEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+tiniEvento.nombre+' guardado con exito.');
});

var saboresEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Caminos y Sabores 15º Edicion',
    descripcion:'El Mercado de los sabores, la Cultura y la Identidad Argentina',
    fecha:'06/07/20',
    tipo:'Exposicion',
    idUsuarioPropietario:'Ciudad BA',
    duracion:'2 Horas',
    genero:'Gastronomia',
    imagen:'http://novedadesaoca.site/wp-content/uploads/2019/02/Imagen2.png',
    rating:3.7,
    personas:0,
    precioE:700,
    ubicacion:'La Rural, Palermo',
    latitude:-34.578170,
    longitude:-58.420584
});

saboresEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+saboresEvento.nombre+' guardado con exito.');
});

var aladinEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Aladin Sera Genial',
    descripcion:'Despedida en vacaciones de invierno!',
    fecha:'30/06/20',
    tipo:'Show',
    idUsuarioPropietario:'Mp Producciones',
    duracion:'2 Horas',
    genero:'Infantil',
    imagen:'https://www.ticketonline.de/obj/media/DE-eventim/galery/222x222/d/disney-aladdin-neu-tickets-2016.jpg',
    rating:3.5,
    personas:0,
    precioE:450,
    ubicacion:'Teatro Gran Rex, CABA',
    latitude:-34.603114,
    longitude:-58.378877
});

aladinEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+aladinEvento.nombre+' guardado con exito.');
});

var glamEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Glamnation',
    descripcion:'LETS FUCKIN ROCK!',
    fecha:'12/07/20',
    tipo:'Show',
    idUsuarioPropietario:'The Roxy Live',
    duracion:'2 Horas',
    genero:'Rock',
    imagen:'http://www.mtsproducciones.com/imagenes/locales/zag-glamnation-300x270.jpg',
    rating:3.0,
    personas:0,
    precioE:150,
    precios: [{nombre:'Entrada general', precio:'150'}],
    ubicacion:'Niceto Vega 5542, CABA',
    latitude:-34.585187,
    longitude:-58.438715
});

glamEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+glamEvento.nombre+' guardado con exito.');
});

var joseEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Josefita',
    descripcion:'La ya conocida banda de las hormigas no para y continúa con sus noche de #RocanrolYCarnaval',
    fecha:'13/07/20',
    tipo:'Concierto',
    idUsuarioPropietario:'The Roxy Live',
    duracion:'2 Horas',
    genero:'Rock',
    imagen:'http://www.mtsproducciones.com/imagenes/locales/ROXY-LVB-WEB-300x270-JOSE-ROX-13-7-19.jpg',
    rating:2.5,
    personas:0,
    precioE:300,
    precios: [{nombre:'Entrada general', precio:'300'}],
    ubicacion:'Niceto Vega 5542, CABA',
    latitude:-34.585187,
    longitude:-58.438715
});

joseEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+joseEvento.nombre+' guardado con exito.');
});

var bocaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Boca vs Athletico Paranaense',
    descripcion:'Copa Libertadores 2019',
    fecha:'31/07/20',
    tipo:'Show',
    idUsuarioPropietario:'Boca Juniors',
    duracion:'2 Horas',
    genero:'Futbol',
    imagen:'http://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2019/05/09/15573533399660.jpg',
    rating:4.8,
    personas:0,
    precioE:3599,
    precios: [{nombre:'Graba Media', precio:'3599'},{nombre:'Palcos', precio:'13000'},{nombre:'Torre', precio:'6769'},{nombre:'Tribuna inferior', precio:'3600'},{nombre:'Upper tier', precio:'4680'}],
    ubicacion:'Brandsen 805, CABA',
    latitude:-34.635417,
    longitude:-58.364692
});

bocaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+bocaEvento.nombre+' guardado con exito.');
});

var barEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Musica en Bares Notables',
    descripcion:'Los Cafés y Bares Notables que se hallan diseminados en diversos barrios de la Ciudad de Buenos Aires',
    fecha:'13/07/20',
    tipo:'Show',
    idUsuarioPropietario:'DisfrutemosBA',
    duracion:'2 Horas',
    genero:'Espectaculo',
    imagen:'https://media-cdn.tripadvisor.com/media/photo-s/0f/f5/91/83/bar-iberia.jpg',
    rating:3.1,
    personas:0,
    precioE:0,
    precios: [{nombre:'Entrada general', precio:'Gratis'}],
    ubicacion:'Av. de Mayo 1196, CABA',
    latitude:-34.609031,
    longitude:-58.383409
});

barEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+barEvento.nombre+' guardado con exito.');
});

var milongaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Convocatoria BA Milonga',
    descripcion:'Abierta a quienes impulsen milongas',
    fecha:'22/07/20',
    tipo:'Show',
    idUsuarioPropietario:'DisfrutemosBA',
    duracion:'2 Horas',
    genero:'Espectaculo',
    imagen:'https://www.buenosaires.gob.ar/sites/gcaba/files/field/image/foto_37_0.jpg',
    rating:3.3,
    personas:0,
    precioE:0,
    precios: [{nombre:'Entrada general', precio:'Gratis'}],
    ubicacion:'Av. de Mayo 575, CABA',
    latitude:-34.607977,
    longitude:-58.374413
});

milongaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+milongaEvento.nombre+' guardado con exito.');
});

var oktoberEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Oktoberfest 2019',
    descripcion:'Fiesta Nacional de la Cerveza',
    fecha:'04/10/20',
    tipo:'Festival',
    idUsuarioPropietario:'Oktoberfest',
    duracion:'6 Horas',
    genero:'Variado',
    imagen:'https://i0.wp.com/www.lawebdelvalle.com/wp-content/uploads/2018/10/oktober-2019.jpg?fit=960%2C640&ssl=1',
    rating:3.9,
    personas:0,
    precioE:300,
    precios: [{nombre:'Entrada general', precio:'300'},{nombre:'Cerveza', precio:'200'},{nombre:'Pancho Chucrut', precio:'200'}],
    ubicacion:'Villa General Belgrano, Cordoba',
    latitude:-34.982599,
    longitude:-64.566771
});

oktoberEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+oktoberEvento.nombre+' guardado con exito.');
});*/

/*var Usuario = require('./model/Usuario');

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
});

var usuario3 = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Susana',
    apellido:'Coronel',
    username:'susicoronel',
    email:'susicoronel@gmail.com',
    password:'12345678'
});

usuario3.save(function(err) {
    if (err) throw err;
        
    console.log('Usuario guardado con exito.');
});*/

// var Comentario = require('./model/Comentario'); 

// var comentario1 = new Comentario({
//     nombreE: lollaEvento.nombre,
//     descripcion:'Buen evento, muy divertido',
//     usuarioId:'matu_pe',
//     eventoId: lollaEvento._id
// });

// comentario1.save(function(err) {
//     if (err) throw err;
        
//     console.log('Comentario guardado con exito.');
// });

// var comentario2 = new Comentario({
//     nombreE: lollaEvento.nombre,
//     descripcion:'Estuvo terrible!! Vuelvo el año que viene...',
//     usuarioId:'gonza_fer',
//     eventoId: lollaEvento._id
// });

// comentario2.save(function(err) {
//     if (err) throw err;
        
//     console.log('Comentario guardado con exito.');
// });

// var comentario3 = new Comentario({
//     nombreE: saboresEvento.nombre,
//     descripcion:'Excelente feria. Muchas ofertas gastronomicas. Super recomendable',
//     usuarioId:'susicoronel',
//     eventoId: saboresEvento._id
// });

// comentario3.save(function(err) {
//     if (err) throw err;
        
//     console.log('Comentario guardado con exito.');
// });