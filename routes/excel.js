const express = require('express');
const router = express.Router();
const{
    readExcel,
} = require('../controllers/ExcelController')

//Ruta get /reports/:docName
router.get('/:docName', function (req, res){
    readExcel(req.params.docName, res);
})

module.exports = router;