const fs = require('fs');
const PDFDocument = require('pdfkit');

function createPDF(req, res) {
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

module.exports = {
    createPDF,
}