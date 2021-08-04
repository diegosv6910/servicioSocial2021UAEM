const FileController = require('../controllers/FileController');
const fileController = new FileController();
const express = require('express');
const router = express.Router();

// Comportamiento raiz.

//Ruta post /subir-archivo.
router.post('/subir-archivo', fileController.subirArchivo);

// exportamos nuestro nuevo router
module.exports = router;