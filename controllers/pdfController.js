const fs = require('fs');
const PDFDocument = require('pdfkit');

function createPDFReprobacion(req, res, semestre, materia) {
    var date = new Date();
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`./pdfs/reprobacion/reporteReprobacion${materia}.pdf`));

    doc.image('./public/img/logoUaem.png', {
        fit: [100, 100],
        align: 'right',
        valign: 'top'
    });
    doc.moveDown();
    doc.text(`Cuernavaca Morelos a: ${date.toDateString()}`)
    doc.moveDown();
    doc.text(`El indice de reprobacion de la materia ${materia} del semestre ${semestre+1} es de: ${req}%`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
}

function createPDFAprobacion(req, res, semestre, materia) {
    var date = new Date();
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`./pdfs/aprobacion/reporteAprobacion${materia}.pdf`));

    doc.image('./public/img/logoUaem.png', {
        fit: [100, 100],
        align: 'right',
        valign: 'top'
    });
    doc.moveDown();
    doc.text(`Cuernavaca Morelos a: ${date.toDateString()}`)
    doc.moveDown();
    doc.text(`El indice de aprobacion de la materia ${materia} del semestre ${semestre+1} es de: ${req}%`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
}

function createPDFPromedioMatricula(matricula, nombre, promedio, res, semestre) {
    var date = new Date();
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`./pdfs/reportePromedio${matricula}.pdf`));

    doc.image('./public/img/logoUaem.png', {
        fit: [100, 100],
        align: 'right',
        valign: 'top'
    });
    doc.moveDown();
    doc.text(`Cuernavaca Morelos a: ${date.toDateString()}`)
    doc.moveDown();
    doc.text(`El alumno: ${nombre} con matricula ${matricula}.
    Tiene un promedio en el ${semestre} de la Lic. Informatica de 
    ${promedio}.`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
    res.redirect('/')
}

function createPDFPromedioGeneralMatricula(matricula, nombre, promedio, res) {
    var date = new Date();
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`./pdfs/reportePromedioGeneral${matricula}.pdf`));

    doc.image('./public/img/logoUaem.png', {
        fit: [100, 100],
        align: 'right',
        valign: 'top'
    });
    doc.moveDown();
    doc.text(`Cuernavaca Morelos a: ${date.toDateString()}`)
    doc.moveDown();
    doc.text(`El alumno: ${nombre} con matricula ${matricula}.
    Tiene un promedio general de la Lic. Informatica de 
    ${promedio}.`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
    res.redirect('/')
}

function createPDFMatricula(indice, semestre, res) {
    var date = new Date();
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`./pdfs/numeroMatricula/reporteMatricula${semestre+1}.pdf`));

    doc.image('./public/img/logoUaem.png', {
        fit: [100, 100],
        align: 'right',
        valign: 'top'
    });
    doc.moveDown();
    doc.text(`Cuernavaca Morelos a: ${date.toDateString()}`)
    doc.moveDown();
    doc.text(`La Matricula del grupo de informatica en el semestre: ${semestre+1} es de: ${indice} alumnos.`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
}

module.exports = {
    createPDFReprobacion,
    createPDFPromedioMatricula,
    createPDFPromedioGeneralMatricula,
    createPDFAprobacion,
    createPDFMatricula,
}