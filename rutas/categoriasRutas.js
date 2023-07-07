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

router.get('/buscar-categoria/:idCategoria',verificador,async (req,res) =>{
    try{
        const { idCategoria } = req.params;
        const categoria = await service.findOne(idCategoria);
        res.json({
            mensaje : categoria ? "categoria encontrada" : 'categoria no encontrada',
            datos   : categoria
        });
    }catch(er){
        console.log(er);
    }
    
});

router.post('/crear-categoria',verificador,async (req,res) =>{
    const body = req.body;
    const respuesta = await service.create(body);

    res.status(201).json({
        estado : respuesta ? 'categoria creada exitosamente' : 'error en la creacion de la categoria' ,
        mensaje: mensaje
    });
});

router.put('/actualizar-categoria/:idCategoria',verificador,async (req,res)=>{

    try{
        const {idCategoria} = req.params;
        const body = req.body;
        const respuesta = await service.update(idCategoria, body);

        res.json({
            estado  : respuesta,
            mensaje : respuesta ? 'categoria modificada exitosamente' : 'error en la modificacion de la categoria'
        });
    }catch(error){
        console.log(error);
    }
});


router.delete('/eliminar-platillo/:idCategoria',verificador,async (req,res)=>{
    const {idCategoria} = req.params;
    const rpta = await service.delete(idCategoria);
    
    res.json({
        mensaje : rpta ? "categoria eliminada exitosamente" : "error en la eliminacion de la categoria"
    });
});




module.exports = router;