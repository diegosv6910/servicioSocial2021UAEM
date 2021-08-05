const XLSX = require('xlsx');
const pdf = require('./pdfController')
const testFolder = './uploads/';
const fs = require('fs');
var lodash = require('lodash');

function readExcel(req, res){
    var sumReprobados = 0;
    const woorkbook = XLSX.readFile('./uploads/'+req);
    const woorkbookSheets = woorkbook.SheetNames;
    const sheet = woorkbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
    console.log(dataExcel);
    for(var item = 3; item < dataExcel.length; item++){
        if(dataExcel[item].__EMPTY_4 < 6 || dataExcel[item].__EMPTY_4 === 'SD' || dataExcel[item].__EMPTY_4 === 'NP'){
            sumReprobados++;
        }
    }
    var alumnos = dataExcel.length - 3;
    var indice = ((sumReprobados*100)/alumnos).toFixed(2);
    pdf.createPDFReprobacion(indice, res)
}

function calificacionSemestre(req, res) {
    var sumaCalificaciones = 0;
    var arrayCalificaciones = [];
    var arrayInfoAlumno = [];
    var arregloMaterias = [];
    fs.readdirSync(testFolder).forEach(file => {
        arregloMaterias.push(file);
    });
    for(index = 0; index < arregloMaterias.length; index++){
        const woorkbook = XLSX.readFile('./uploads/'+arregloMaterias[index]);
        const woorkbookSheets = woorkbook.SheetNames;
        const sheet = woorkbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
        for(var item = 2; item < dataExcel.length; item++){
            if(dataExcel[item].__EMPTY == req){
                arrayInfoAlumno.push(dataExcel[item].__EMPTY_1, dataExcel[item].__EMPTY_2, dataExcel[item].__EMPTY_3)
                arrayCalificaciones.push(dataExcel[item].__EMPTY_4)
            }
        }
    }
    //Generacion del promedio
    for(index = 0; index < arrayCalificaciones.length; index++){
        if(typeof(arrayCalificaciones[index] === 'number')){
                sumaCalificaciones += arrayCalificaciones[index]
        }
    }
    const arrayInfoAlumnoFormat = new Set(arrayInfoAlumno);
    arrayInfoAlumno = [...arrayInfoAlumnoFormat]
    infoAlumno = arrayInfoAlumno.join(' ');
    var promedio = sumaCalificaciones / 6;
    pdf.createPDFPromedioMatricula(req, infoAlumno, promedio, res)
}

module.exports = {
    readExcel,
    calificacionSemestre,
}