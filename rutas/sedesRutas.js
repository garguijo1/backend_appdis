const express = require('express');
const sedesService = require('../servicios/sedesService.js');
const verificador = require("./../verificaciones//verificador");

const router = express.Router();
const service = new sedesService();

router.get('/listar-sedes',verificador,async (req,res) =>{

    const sedes = await service.find();
    console.log(sedes);
    res.json({
        mensaje : "datos de las sedes",
        datos : sedes
    });
});


module.exports = router;