const express = require('express');
const clientesService = require('../servicios/clientesService.js');
const verificador = require("./../verificaciones//verificador");

const router = express.Router();
const service = new clientesService();

router.get('/',verificador,async (req,res) =>{

    const clientes = await service.find();
    console.log(clientes);
    res.json(clientes);
});

router.get('/:idCliente',verificador,async (req,res) =>{
    try{
        const { idCliente } = req.params;
        const cliente = await service.findOne(idCliente);
        console.log(req.headers);
        console.log(cliente);
        res.json(cliente);
    }catch(er){
        console.log(er);
    }
    
});

router.post('/crear',async (req,res) =>{
    const body = req.body;
    const resCliente = await service.create(body);

    let mensaje = "";

    if(resCliente) mensaje = "comensal creado exitosamente";
    else mensaje = "error en la creacion del comensal"
    
    res.status(201).json({
        mensaje: mensaje,
    });
});

router.post('/login',async (req,res) =>{
    const body = req.body;
    console.log(body);
    const newCliente = await service.login(body);
    res.status(201).json({
        mensaje: newCliente.mensaje,
        datos: newCliente.data
    });
});

router.put('/modificar/:idCliente',verificador,async (req,res)=>{

    try{
        const {idCliente} = req.params;
        const body = req.body;
        const cliente = await service.update(idCliente, body);
        res.json(cliente);
    }catch(error){
        console.log(error);
    }  
});

router.delete('/eliminar/:idCliente',verificador,async (req,res)=>{
    const {idCliente} = req.params;
    const rpta = await service.delete(idCliente);
    res.json(rpta);
});


module.exports = router;