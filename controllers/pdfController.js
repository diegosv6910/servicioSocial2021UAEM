const fs = require('fs');
const PDFDocument = require('pdfkit');

function createPDFReprobacion(req, res) {
    var date = new Date();
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('./pdfs/reporteReprobacion.pdf'));

    doc.image('./public/img/logoUaem.png', {
        fit: [100, 100],
        align: 'right',
        valign: 'top'
    });
    doc.moveDown();
    doc.text(`Cuernavaca Morelos a: ${date.toDateString()}`)
    doc.moveDown();
    doc.text(`El indice de reprobacion es de: ${req}%`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
    res.redirect('/')
}

function createPDFPromedioMatricula(matricula, nombre, promedio, res) {
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
    Tiene un promedio general en el 1er Semestre de la Lic. Informatica de 
    ${promedio}.`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
    res.redirect('/')
}

module.exports = {
    createPDFReprobacion,
    createPDFPromedioMatricula
}