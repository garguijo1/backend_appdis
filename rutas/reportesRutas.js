const express = require('express');
const reportesService = require('../servicios/reportesService.js');
const verificador = require("./../verificaciones//verificador");

const router = express.Router();
const service = new reportesService();

router.get('/',async (req,res) =>{

    res.json({
        mensaje : "Hola desde los reportes",
    });
});


module.exports = router;