const express = require('express');
const reservacionesServices = require('./../servicios/reservasService.js');
const verificador = require("./../verificaciones//verificador");

const router = express.Router();
const service = new reservacionesServices();

router.get('/listar-reservaciones',verificador, async (req,res) =>{
    const reservaciones = await service.find();
    res.json(reservaciones);
});


router.get('/buscar-reservacion/:idReservacion',verificador,async (req,res) =>{
    try{
        const { idReservacion } = req.params;
        const reservacion = await service.findOne(idReservacion);
        res.json(reservacion);
    }catch(er){
        console.log(er);
    }
    
});

router.get('/listar-reservaciones-cliente/:idCliente',verificador,async (req,res) =>{
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

// pasa a reportes

router.get('/sede/:idSede',verificador,async (req,res) =>{
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

router.post('/filtrar',verificador,async (req,res) =>{
    try{
        const data = req.body;
        const reservaciones = await service.findFilter(data);
        res.json(reservaciones);
    }catch(er){
        console.log(er);
    }
    
});

//-------------------------------------------------------------
router.post('/crear-reservacion',verificador,async (req,res) =>{
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

router.post('/agregar-platillos-reservacion',verificador,async (req,res) =>{
    const body = req.body;
    let status = true;
    
    for (let i = 0; i < body.platillos.length; i++) {
        const pl =  body.platillos[i];
        let agregar_platillo = {};
        agregar_platillo.id_reservacion = body.id_reservacion;
        agregar_platillo.id_platillo    = pl.id_platillo;
        agregar_platillo.cantidad       = pl.cantidad;
        const respuesta = await service.addPlatillo(agregar_platillo);
        if(!respuesta) status = false;
    };
    
    res.status(201).json({
        mensaje: status ? 'agregados correctamente' : 'error al agrear los platillos'
    });
});

router.put('/atender/:idReservacion',verificador,async (req,res)=>{

    try{
        const {idReservacion} = req.params;
        const body = req.body;
        const respuesta = await service.atender(idReservacion);
        res.json(respuesta);
    }catch(error){
        console.log(error);
    } 
});

router.put('/cancelar-reservacion/:idReservacion',verificador,async (req,res)=>{

    try{
        const {idReservacion} = req.params;
        const body = req.body;
        const respuesta = await service.cancelar(idReservacion);
        res.json(respuesta);
    }catch(error){
        console.log(error);
    }

    
});

router.get('/validar-horario/:idSede',verificador,async (req,res)=>{
    const {idSede} = req.params
    const horario = req.body.horario;

    let disponible = false ;

    let respuesta = await service.validarHorario(idSede,horario);
    if(respuesta[0].cantidad < respuesta[0].mesas ) disponible = true;
    respuesta[0].disponible = disponible;

    res.json(respuesta);
     
});

router.get('/detallar/:idReservacion',verificador,async (req,res)=>{
    const {idReservacion} = req.params;
    let respuesta = await service.detalleReserva(idReservacion);

    res.json({
        datos : respuesta
    });
     
});

router.delete('/eliminar-reservacion/:idRservacion',verificador,async (req,res)=>{
    const {idRservacion} = req.params;
    const rpta = await service.delete(idRservacion);
    res.json({
        estate : rpta,
        message : rpta ? 'Reservacion eliminada correctamete' : 'No se pudo eliminar la reservacion' 
    });
});


module.exports = router;