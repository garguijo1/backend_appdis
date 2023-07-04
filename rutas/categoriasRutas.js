const express = require('express');
const categoriasService = require('../servicios/categoriasService.js');
const verificador = require("./../verificaciones//verificador");

const router = express.Router();
const service = new categoriasService();

router.get('/listar-categorias',verificador,async (req,res) =>{

    const categorias = await service.find();
    console.log(categorias);
    res.json(categorias);
});




module.exports = router;