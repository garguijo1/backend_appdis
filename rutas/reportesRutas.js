const express = require('express');
const reportesService = require('../servicios/reportesService.js');
const verificador = require("./../verificaciones//verificador");

const router = express.Router();
const service = new reportesService();

router.get('/',async (req,res) =>{
    let body = req.body;
    let respuesta = await service.platillos_mas_solicitados(body.categorias);
    res.json({
        mensaje : "platillos mas vendidos",
        datos : respuesta
    });
});


module.exports = router;