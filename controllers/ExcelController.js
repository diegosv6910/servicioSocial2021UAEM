const XLSX = require('xlsx');
const pdf = require('./pdfController')
const testFolder = './uploads/';
const fs = require('fs');
var lodash = require('lodash');


//Funcion para el indice de reprobacion
function readExcel(req, res) {
    var sumReprobados = 0;
    var arregloMaterias = [];
    for (var i = 1; i < 9; i++) {
        fs.readdirSync(`./uploads/${i}° SEMESTRE`).forEach(file => {
            arregloMaterias.push(file);
        });
    }

    //Funcion para dividir el arreglo de materias en semestres
    function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    var arregloMateriasSemestre = chunkArray(arregloMaterias, 6);
    for (var i = 0; i <= 7; i++) {
        for (index = 0; index <= 5; index++) {
            const woorkbook = XLSX.readFile(`./uploads/${i + 1}° SEMESTRE/${arregloMateriasSemestre[i][index]}`);
            const woorkbookSheets = woorkbook.SheetNames;
            const sheet = woorkbookSheets[0];
            const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
            // console.log(dataExcel);
            for (var item = 3; item < dataExcel.length; item++) {
                if (dataExcel[item].__EMPTY_4 < 6 || dataExcel[item].__EMPTY_4 === 'SD' || dataExcel[item].__EMPTY_4 === 'NP') {
                    sumReprobados++;
                }
            }
            var alumnos = dataExcel.length - 3;
            var indice = ((sumReprobados * 100) / alumnos).toFixed(2);
            sumReprobados = 0;
            pdf.createPDFReprobacion(indice, res, i, arregloMateriasSemestre[i][index])
        }
    }
    res.redirect('/');
}

//Funcion para el indice de aprobacion
function aprobacionMaterias(req, res) {
    var sumReprobados = 0;
    var arregloMaterias = [];
    for (var i = 1; i < 9; i++) {
        fs.readdirSync(`./uploads/${i}° SEMESTRE`).forEach(file => {
            arregloMaterias.push(file);
        });
    }

    //Funcion para dividir el arreglo de materias en semestres
    function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    var arregloMateriasSemestre = chunkArray(arregloMaterias, 6);
    for (var i = 0; i <= 7; i++) {
        for (index = 0; index <= 5; index++) {
            const woorkbook = XLSX.readFile(`./uploads/${i + 1}° SEMESTRE/${arregloMateriasSemestre[i][index]}`);
            const woorkbookSheets = woorkbook.SheetNames;
            const sheet = woorkbookSheets[0];
            const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
            // console.log(dataExcel);
            for (var item = 3; item < dataExcel.length; item++) {
                if (dataExcel[item].__EMPTY_4 < 6 || dataExcel[item].__EMPTY_4 === 'SD' || dataExcel[item].__EMPTY_4 === 'NP') {
                    sumReprobados++;
                }
            }
            var alumnos = dataExcel.length - 3;
            var indice = 100 - ((sumReprobados * 100) / alumnos).toFixed(2);
            sumReprobados = 0;
            pdf.createPDFAprobacion(indice, res, i, arregloMateriasSemestre[i][index])
        }
    }
    res.redirect('/');
}

//Funcion para calcular calificaciones por semestre
function calificacionSemestre(req, semestre, res) {
    //Obtenemos el nombre de la carpeta en base al semestre.
    var carpetaSemestre = '';
    switch (semestre) {
        case '1': carpetaSemestre = '1° SEMESTRE'; break;
        case '2': carpetaSemestre = '2° SEMESTRE'; break;
        case '3': carpetaSemestre = '3° SEMESTRE'; break;
        case '4': carpetaSemestre = '4° SEMESTRE'; break;
        case '5': carpetaSemestre = '5° SEMESTRE'; break;
        case '6': carpetaSemestre = '6° SEMESTRE'; break;
        case '7': carpetaSemestre = '7° SEMESTRE'; break;
        case '8': carpetaSemestre = '8° SEMESTRE'; break;
    }
    //Funcionalidad.
    var sumaCalificaciones = 0;
    var arrayCalificaciones = [];
    var arrayInfoAlumno = [];
    var arregloMaterias = [];
    fs.readdirSync(`./uploads/${carpetaSemestre}`).forEach(file => {
        arregloMaterias.push(file);
    });
    for (index = 0; index < arregloMaterias.length; index++) {
        const woorkbook = XLSX.readFile(`./uploads/${carpetaSemestre}/${arregloMaterias[index]}`);
        const woorkbookSheets = woorkbook.SheetNames;
        const sheet = woorkbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
        for (var item = 2; item < dataExcel.length; item++) {
            if (dataExcel[item].__EMPTY == req) {
                arrayInfoAlumno.push(dataExcel[item].__EMPTY_1, dataExcel[item].__EMPTY_2, dataExcel[item].__EMPTY_3)
                arrayCalificaciones.push(dataExcel[item].__EMPTY_4)
            }
        }
    }
    //Generacion del promedio
    for (index = 0; index < arrayCalificaciones.length; index++) {
        if (typeof (arrayCalificaciones[index] === 'number')) {
            sumaCalificaciones += arrayCalificaciones[index]
        }
    }
    const arrayInfoAlumnoFormat = new Set(arrayInfoAlumno);
    arrayInfoAlumno = [...arrayInfoAlumnoFormat]
    infoAlumno = arrayInfoAlumno.join(' ');
    var promedio = sumaCalificaciones / 6;
    pdf.createPDFPromedioMatricula(req, infoAlumno, promedio, res, carpetaSemestre)
}

//Funcion para calcular promedio GENERAL por estudiante.
function calificacionGeneralAlumno(req, res) {
    //Funcionalidad.
    var sumaCalificaciones = 0;
    var arrayCalificaciones = [];
    var arrayInfoAlumno = [];
    var arregloMaterias = [];
    for (var i = 1; i < 9; i++) {
        fs.readdirSync(`./uploads/${i}° SEMESTRE`).forEach(file => {
            arregloMaterias.push(file);
        });
    }

    //Funcion para dividir el arreglo de materias en semestres
    function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    var arregloMateriasSemestre = chunkArray(arregloMaterias, 6);

    for (var i = 0; i < 7; i++) {
        for (index = 0; index <= 5; index++) {
            const woorkbook = XLSX.readFile(`./uploads/${i + 1}° SEMESTRE/${arregloMateriasSemestre[i][index]}`);
            const woorkbookSheets = woorkbook.SheetNames;
            const sheet = woorkbookSheets[0];
            const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
            for (var item = 2; item < dataExcel.length; item++) {
                if (dataExcel[item].__EMPTY == req) {
                    arrayInfoAlumno.push(dataExcel[item].__EMPTY_1, dataExcel[item].__EMPTY_2, dataExcel[item].__EMPTY_3)
                    arrayCalificaciones.push(dataExcel[item].__EMPTY_4)
                }
            }
        }
    }
    //Generacion del promedio
    for (index = 0; index < arrayCalificaciones.length; index++) {
        if (typeof (arrayCalificaciones[index] === 'number')) {
            sumaCalificaciones += arrayCalificaciones[index]
        }
    }
    const arrayInfoAlumnoFormat = new Set(arrayInfoAlumno);
    arrayInfoAlumno = [...arrayInfoAlumnoFormat]
    infoAlumno = arrayInfoAlumno.join(' ');
    var promedio = sumaCalificaciones / 6;
    var sumGeneral = + promedio;
    var promedioGeneral = sumGeneral / 8
    pdf.createPDFPromedioGeneralMatricula(req, infoAlumno, promedioGeneral, res)
}

//Funcion para el numero de matricula por grupo
function matriculaGrupo(req, res) {
    var sumReprobados = 0;
    var arregloMaterias = [];
    for (var i = 1; i < 9; i++) {
        fs.readdirSync(`./uploads/${i}° SEMESTRE`).forEach(file => {
            arregloMaterias.push(file);
        });
    }

    //Funcion para dividir el arreglo de materias en semestres
    function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    var arregloMateriasSemestre = chunkArray(arregloMaterias, 6);
    for (var i = 0; i <= 7; i++) {
        const woorkbook = XLSX.readFile(`./uploads/${i + 1}° SEMESTRE/${arregloMateriasSemestre[i][0]}`);
        const woorkbookSheets = woorkbook.SheetNames;
        const sheet = woorkbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
        var alumnos = dataExcel.length - 3;
        pdf.createPDFMatricula(alumnos, i, res)
    }
    res.redirect('/');
}

//Funcion para el indice de eficiencia terminal
function eficienciaGrupo(req, res) {
    var arregloMaterias = [];
    for (var i = 1; i < 9; i++) {
        fs.readdirSync(`./uploads/${i}° SEMESTRE`).forEach(file => {
            arregloMaterias.push(file);
        });
    }

    //Funcion para dividir el arreglo de materias en semestres
    function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    var arregloMateriasSemestre = chunkArray(arregloMaterias, 6);
    const woorkbook = XLSX.readFile(`./uploads/1° SEMESTRE/${arregloMateriasSemestre[0][0]}`);
    const woorkbookSheets = woorkbook.SheetNames;
    const sheet = woorkbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
    var alumnos = dataExcel.length - 3;
    const woorkbook1 = XLSX.readFile(`./uploads/8° SEMESTRE/${arregloMateriasSemestre[7][0]}`);
    const woorkbookSheets1 = woorkbook1.SheetNames;
    const sheet1 = woorkbookSheets1[0];
    const dataExcel1 = XLSX.utils.sheet_to_json(woorkbook1.Sheets[sheet1])
    var alumnos1 = dataExcel1.length - 3;
    var eficiencia = ((alumnos1 / alumnos) * 100)
    pdf.createPDFEficiencia(alumnos, alumnos1, eficiencia, res)
    res.redirect('/');
}

//Funcion para el indice de desercion
function desercionGrupo(req, res) {
    var arregloMaterias = [];
    for (var i = 1; i < 9; i++) {
        fs.readdirSync(`./uploads/${i}° SEMESTRE`).forEach(file => {
            arregloMaterias.push(file);
        });
    }

    //Funcion para dividir el arreglo de materias en semestres
    function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    var arregloMateriasSemestre = chunkArray(arregloMaterias, 6);
    const woorkbook = XLSX.readFile(`./uploads/1° SEMESTRE/${arregloMateriasSemestre[0][0]}`);
    const woorkbookSheets = woorkbook.SheetNames;
    const sheet = woorkbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
    var alumnos = dataExcel.length - 3;
    const woorkbook1 = XLSX.readFile(`./uploads/8° SEMESTRE/${arregloMateriasSemestre[7][0]}`);
    const woorkbookSheets1 = woorkbook1.SheetNames;
    const sheet1 = woorkbookSheets1[0];
    const dataExcel1 = XLSX.utils.sheet_to_json(woorkbook1.Sheets[sheet1])
    var alumnos1 = dataExcel1.length - 3;
    var eficiencia = ((alumnos1 / alumnos) * 100)
    var desercion = 100 - eficiencia;
    pdf.createPDFDesercion(alumnos, alumnos1, desercion, res)
    res.redirect('/');
}

//Funcion para el indice de titulacion
function titulacionGrupo(req, res) {
    var arregloMaterias = [];
    for (var i = 1; i < 9; i++) {
        fs.readdirSync(`./uploads/${i}° SEMESTRE`).forEach(file => {
            arregloMaterias.push(file);
        });
    }

    //Funcion para dividir el arreglo de materias en semestres
    function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    var arregloMateriasSemestre = chunkArray(arregloMaterias, 6);
    const woorkbook = XLSX.readFile(`./uploads/1° SEMESTRE/${arregloMateriasSemestre[0][0]}`);
    const woorkbookSheets = woorkbook.SheetNames;
    const sheet = woorkbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
    var alumnos = dataExcel.length - 3;
    var titulacion = ((5 / alumnos) * 100).toFixed(2);
    pdf.createPDFTitulacion(alumnos, 5, titulacion, res)
    res.redirect('/');
}


module.exports = {
    readExcel,
    calificacionSemestre,
    calificacionGeneralAlumno,
    aprobacionMaterias,
    matriculaGrupo,
    eficienciaGrupo,
    desercionGrupo,
    titulacionGrupo,
}