const express = require('express');
const sedesService = require('../servicios/sedesService.js');
const verificador = require("../verificaciones/verificador.js");

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

router.get('/buscar-sede/:idSede',verificador,async (req,res) =>{
    try{
        const { idSede } = req.params;
        const sede = await service.findOne(idSede);
        res.json({
            mensaje : sede ? 'sede encontrada' : 'sede no encontrada',
            datos : sede
        });
    }catch(er){
        console.log(er);
    }
    
});

router.post('/crear-sede',verificador,async (req,res) =>{
    const body = req.body;
    const respuesta = await service.create(body);

    res.status(201).json({
        estado : respuesta,
        mensaje: respuesta ? 'sede creada exitosamente' : 'error en la creacion de la sede'
    });
});

router.put('/actualizar-sede/:idSede',verificador,async (req,res)=>{
    try{
        const {idSede} = req.params;
        const body = req.body;
        const respuesta = await service.update(idSede, body);

        res.json({
            estado : respuesta,
            mensaje : respuesta ? 'sede modificada exitosamente' : 'error en la modificacion de la sede' 
        });
    }catch(error){
        console.log(error);
    }
});


router.delete('/eliminar-sede/:idSede',verificador,async (req,res)=>{
    const {idSede} = req.params;
    const rpta = await service.delete(idSede);
    
    res.json({
        mensaje : rpta ? 'sede eliminada exitosamente' : 'error en la eliminacion de la sede'
    });
});


module.exports = router;