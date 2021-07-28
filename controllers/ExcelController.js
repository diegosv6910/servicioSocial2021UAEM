const XLSX = require('xlsx');
const pdf = require('./pdfController')

function readExcel(req, res){
    var sumReprobados = 0;
    const woorkbook = XLSX.readFile('./uploads/'+req);
    const woorkbookSheets = woorkbook.SheetNames;
    const sheet = woorkbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(woorkbook.Sheets[sheet])
    for(var item = 3; item < dataExcel.length; item++){
        if(dataExcel[item].__EMPTY_4 < 6 || dataExcel[item].__EMPTY_4 === 'SD' || dataExcel[item].__EMPTY_4 === 'NP'){
            sumReprobados++;
        }
    }
    var alumnos = dataExcel.length - 3;
    var indice = ((sumReprobados*100)/alumnos).toFixed(2);
    pdf.createPDF(indice, res)
}

module.exports = {
    readExcel,
}