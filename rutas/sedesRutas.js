const express = require('express');
const sedesService = require('../servicios/sedesService.js');
const verificador = require("./../verificaciones//verificador");
const validarAccion = require("./../verificaciones/validarAcciones");

const router = express.Router();
const service = new sedesService();

router.get('/',validarAccion,verificador,async (req,res) =>{

    const sedes = await service.find();
    console.log(sedes);
    res.json({
        mensaje : "datos de las sedes",
        datos : sedes
    });
});


module.exports = router;