const express = require('express');
const router = express.Router();
path = require('path');

const bodyParser = require('body-parser');
const fs = require('fs');
const fileupload = require('express-fileupload');
const FileController = require('./controllers/FileController');

const{
    readExcel
} = require('./controllers/ExcelController')

const app = express();
const fileController = new FileController();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

router.post('/subir-archivo', fileController.subirArchivo);
// router.post('/generar-reporte', ExcelController.leerArchivo)

router.use(function (req, res) {
    res.status(404).json({
        error: true,
        message: 'Not Found'
    });
});

app.use('/api', router);

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/lib'));
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    const fs = require('fs');
    var files = fs.readdirSync('./uploads')
    res.render('index', { arrayData: files });
});

app.get('/reports/:docName', function (req, res){
    readExcel(req.params.docName, res);
})

var port = 3000;
app.listen(port, function () {
    console.log('Server', process.pid, 'listening on port', port);
});

module.exports = app;