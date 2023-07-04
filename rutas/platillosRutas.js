const express = require('express');
const platillosServices = require('./../servicios/platillosService.js');
const verificador = require("./../verificaciones//verificador");

const router = express.Router();
const service = new platillosServices();

router.get('/',verificador, async (req,res) =>{
    const platillos = await service.find();
    // console.log(platillos);
    res.json({
        mensaje : "platillos del menu",
        datos : platillos
    })
});


router.get('/:idPlatillo',verificador,async (req,res) =>{
    try{
        const { idPlatillo } = req.params;
        const platillo = await service.findOne(idPlatillo);
        // console.log(platillo);
        res.json({
            mensaje : "platillo del menu",
            datos : platillo
        });
    }catch(er){
        console.log(er);
    }
    
});

router.post('/crear',verificador,async (req,res) =>{
    const body = req.body;
    const respuesta = await service.create(body);

    let mensaje = "error en la creacion del platillo";
    if(respuesta) mensaje = "platillo creado exitosamente";


    res.status(201).json({
        estado : respuesta,
        mensaje: mensaje
    });
});

router.put('/modificar/:idPlatillo',verificador,async (req,res)=>{

    try{
        const {idPlatillo} = req.params;
        const body = req.body;
        const respuesta = await service.update(idPlatillo, body);
        // console.log(platillo);

        let mensaje = "error en la modificacion del platillo";
        if(respuesta) mensaje = "platillo modificado exitosamente";

        res.json({
            estado : respuesta,
            mensaje : mensaje
        });
    }catch(error){
        console.log(error);
    }

    
});


router.delete('/eliminar/:idPlatillo',verificador,async (req,res)=>{
    const {idPlatillo} = req.params;
    const rpta = await service.delete(idPlatillo);
    
    let mensaje = "error en la eliminacion del platillo";

    if(rpta) mensaje = "platillo eliminado exitosamente"

    res.json({
        mensaje : mensaje
    });
});


module.exports = router;