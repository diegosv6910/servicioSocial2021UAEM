const express = require('express');
const router = express.Router();
const{
    readExcel,
    calificacionSemestre,
} = require('../controllers/ExcelController')

//Ruta get /reports/:docName
router.get('/:docName', function (req, res){
    readExcel(req.params.docName, res);
})

router.get('/semestreAlumno/:matricula', function (req, res) {
    calificacionSemestre(req.params.matricula, res);
})

module.exports = router;