const express = require('express');
const router = express.Router();
const{
    readExcel,
    calificacionSemestre,
    calificacionGeneralAlumno,
    aprobacionMaterias,
    matriculaGrupo,
    eficienciaGrupo,
    desercionGrupo,
    titulacionGrupo,
} = require('../controllers/ExcelController')

//Ruta get /reports/:docName
router.get('/reprobacion', function (req, res){
    readExcel(req, res);
})

router.get('/aprobacion', function (req, res){
    aprobacionMaterias(req, res)
})

router.get('/semestreAlumno/:semestre/:matricula', function (req, res) {
    calificacionSemestre(req.params.matricula, req.params.semestre, res);
})

router.get('/calificacionAlumno/:matricula', function (req, res) {
    calificacionGeneralAlumno(req.params.matricula, res);
})

router.get('/matricula', function (req, res){
    matriculaGrupo(req, res);
})

router.get('/eficiencia', function (req, res){
    eficienciaGrupo(req,res);
})

router.get('/desercion', function (req, res){
    desercionGrupo(req,res);
})

router.get('/titulacion', function (req, res){
    titulacionGrupo(req,res);
})



module.exports = router;