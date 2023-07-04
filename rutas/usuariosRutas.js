const express = require('express');
const usuariosService = require('../servicios/usuariosService.js');
const validar = require('../verificaciones/verificador.js');

const router = express.Router();
const service = new usuariosService();

router.get('/listar-usuarios',validar,async (req,res) =>{

    const clientes = await service.find();
    console.log(clientes);
    res.json(clientes);
});

router.get('/buscar-usuario/:idCliente',validar,async (req,res) =>{
    try{
        const { idCliente } = req.params;
        const platillo = await service.findOne(idCliente);
        res.json(platillo);
    }catch(er){
        console.log(er);
    }
    
});

router.get('/listar-opciones-menu/:idRol',validar,async (req,res) =>{
    try{
        const { idRol } = req.params;
        const menu = await service.menu(idRol);
        console.log(menu);
        res.json(menu);
    }catch(er){
        console.log(er);
    }
    
});

router.post('/crear-usuario',validar,async (req,res) =>{
    const body = req.body;
    const respuestaUsuario = await service.create(body);
    
    let mensaje = "";

    if (respuestaUsuario) mensaje = "usuario creado correctamente";
    else mensaje = "error en la creacion del usuario";  

    res.status(201).json({
        mensaje: mensaje
    });
});

router.post('/login',async (req,res) =>{
    const body = req.body;
    const newUser = await service.login(body);
    res.status(201).json({
        mensaje: newUser.mensaje,
        datos: newUser.data
    });
});

router.put('/deslogin/:idUsuario',validar,async (req,res) =>{
    let mensaje;
    const {idUsuario} = req.params;
    const respuesta = await service.deslogin(idUsuario);
    if(respuesta){
        mensaje = "sesion cerrada";
    }else{
        mensaje = "error al cerrar sesion";
    }
    res.status(201).json({
        estado : respuesta,
        message: mensaje
    });
});



router.put('/modificar-usuario/:idUsuario',async (req,res)=>{

    try{
        const {idUsuario} = req.params;
        const body = req.body;
        const usuario = await service.update(idUsuario, body);
        res.json(usuario);
    }catch(error){
        console.log(error);
    }  
});

router.delete('/eliminar-usuario/:idUsuario',async (req,res)=>{
    const {idUsuario} = req.params;
    const rpta = await service.delete(idUsuario);
    res.json(rpta);
});


module.exports = router;