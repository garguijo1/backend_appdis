const express = require('express');
const pagosService = require('../servicios/pagosService.js');
const verificador = require("../verificaciones/verificador.js");

const router = express.Router();
const service = new pagosService();

router.get('/',async (req,res) =>{

    res.json({
        mensaje : "Hola desde los pagos",
    });
});


module.exports = router;