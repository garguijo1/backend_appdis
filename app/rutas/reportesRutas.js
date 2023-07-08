const express = require('express');
const reportesService = require('../servicios/reportesService.js');
const verificador = require("../verificaciones/verificador.js");

const router = express.Router();
const service = new reportesService();

router.get('/platillos-mas-vendidos',async (req,res) =>{
    let query = req.query;
    let respuesta = await service.platillos_mas_solicitados(query.categorias);
    res.json({
        mensaje : "platillos mas vendidos",
        datos : respuesta
    });
});

router.get('/sede-reservas/:mes',async (req,res) =>{
    let { mes } = req.params;
    let respuesta = await service.reservas_sede(mes);
    res.json({
        mensaje : "ventas por sede",
        datos : respuesta
    });
});

module.exports = router;