const express = require('express');
const reservacionesServices = require('./../servicios/reservasService.js');
const verificador = require("./../verificaciones//verificador");
const validarAccion = require("./../verificaciones/validarAcciones");

const router = express.Router();
const service = new reservacionesServices();

router.get('/',validarAccion,verificador, async (req,res) =>{
    const reservaciones = await service.find();
    res.json(reservaciones);
});


router.get('/:idReservacion',validarAccion,verificador,async (req,res) =>{
    try{
        const { idReservacion } = req.params;
        const reservacion = await service.findOne(idReservacion);
        res.json(reservacion);
    }catch(er){
        console.log(er);
    }
    
});

router.get('/cliente/:idCliente',validarAccion,verificador,async (req,res) =>{
    try{
        const { idCliente } = req.params;
        const reservaciones = await service.findClient(idCliente);
        res.json({
            mensaje : "reservaciones hechas por un cliente",
            datos : reservaciones
        });
    }catch(er){
        console.log(er);
    }
    
});

router.get('/sede/:idSede',validarAccion,verificador,async (req,res) =>{
    try{
        const { idSede } = req.params;
        const reservaciones = await service.findSede(idSede);
        res.json({
            mensaje : "reservaciones hechas en una sede",
            datos : reservaciones
        });
    }catch(er){
        console.log(er);
    }
    
});

router.post('/filtrar',validarAccion,verificador,async (req,res) =>{
    try{
        const data = req.body;
        const reservaciones = await service.findFilter(data);
        res.json(reservaciones);
    }catch(er){
        console.log(er);
    }
    
});

router.post('/crear',validarAccion,verificador,async (req,res) =>{
    const body = req.body;
    console.log("creando la reservacion");
    const newReservacion = await service.create(body);

    let idReservacion = 0;
    let mensaje = "error en la creacion de la reservacion"

    if(newReservacion){
        idReservacion = newReservacion.insertId ;
        mensaje = "reservacion creada correctamente"
    } 

    console.log(mensaje);

    res.status(201).json({
        mensaje: mensaje,
        idReservacion: idReservacion
    });
});

router.post('/agregarPlatillo',validarAccion,verificador,async (req,res) =>{
    const body = req.body;
    const respuesta = await service.addPlatillo(body);
    let mensaje = "error en agregar platillo";
    if(respuesta) mensaje = "platillo agregado correctamente"

    res.status(201).json({
        mensaje: mensaje
    });
});

router.put('/atender/:idReservacion',validarAccion,verificador,async (req,res)=>{

    try{
        const {idReservacion} = req.params;
        const body = req.body;
        const respuesta = await service.atender(idReservacion, body);
        console.log(respuesta);
        res.json(respuesta);
    }catch(error){
        console.log(error);
    }

    
});

router.get('/validarHorario/:idSede',validarAccion,verificador,async (req,res)=>{
    const {idSede} = req.params
    const horario = req.body.horario;

    let disponible = false ;

    let respuesta = await service.validarHorario(idSede,horario);
    if(respuesta[0].cantidad < respuesta[0].mesas ) disponible = true;
    respuesta[0].disponible = disponible;

    res.json(respuesta);
     
});

router.get('/detallar/:idReservacion',validarAccion,verificador,async (req,res)=>{
    const {idReservacion} = req.params;
    let respuesta = await service.detalleReserva(idReservacion);

    res.json({
        datos : respuesta
    });
     
});


router.put('/modificar/:idReservacion',validarAccion,verificador,async (req,res)=>{

    // try{
    //     const {idPlatillo} = req.params;
    //     const body = req.body;
    //     const platillo = await service.update(idPlatillo, body);
    //     console.log(platillo);
    //     res.json(platillo);
    // }catch(error){
    //     console.log(error);
    // }

});


router.delete('/eliminar/:idRservacion',validarAccion,verificador,async (req,res)=>{
    // const {idPlatillo} = req.params;
    // const rpta = await service.delete(idPlatillo);
    // res.json(rpta);
});


module.exports = router;