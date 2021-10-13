//Configuracion de express.
const express = require('express');
const router = express.Router();
const app = express();

//Configuracion Middlewares
path = require('path');
const fs = require('fs');
const fileupload = require('express-fileupload');

//Confiiguracion Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

//Comportamientos de rutas
//Ruta Principal
app.get('/', function (req, res) {
    const fs = require('fs');
    var files = fs.readdirSync('./uploads')
    res.render('reports', { arrayData: files });
});

app.get('/trayectoria', function (req, res) {
    res.render('trayectoria');
})

app.get('/login', function(req, res) {
    res.render('login');  
})

//Uso de router para los errores y excepciones.
router.use(function (req, res) {
    res.status(404).json({
        error: true,
        message: 'Not Found'
    });
});

//Uso de una ruta como predeterminada.
app.use('/api', require('./routes/index'));
app.use('/reports', require('./routes/excel'));

//Configuracion de los directorios estaticos.
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/lib'));
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');

//Inicializamos el servidor.
var port = 3000;
app.listen(port, function () {
    console.log('Server', process.pid, 'listening on port', port);
});

//Exportamos app.
module.exports = app;