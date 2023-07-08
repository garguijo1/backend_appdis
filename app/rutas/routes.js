const express = require('express');

const platillosRutas = require('./platillosRutas.js');
const clientesRutas = require('./clientesRutas.js');
const usuariosRutas = require('./usuariosRutas.js');
const reservacionesRutas = require('./reservasRutas.js');
const categoriasRutas = require('./categoriasRutas.js');
const sedesRutas = require('./sedesRutas.js');
const reportesRutas = require('./reportesRutas.js');
const pagosRutas = require('./pagosRutas.js');

function routerApi(app){
    const router = express.Router();
    app.use('/',router);
        router.use('/ne-gestion-platillos/bstk/servicio-al-cliente/v1',platillosRutas);
        router.use('/ne-gestion-cliente/bstk/servicio-al-cliente/v1',clientesRutas);
        router.use('/ne-gestion-usuarios/bstk/servicio-al-cliente/v1',usuariosRutas);
        router.use('/ne-gestion-reservaciones/bstk/servicio-al-cliente/v1',reservacionesRutas);
        router.use('/ne-gestion-categoria/bstk/servicio-al-cliente/v1',categoriasRutas);
        router.use('/ne-gestion-sedes/bstk/servicio-al-cliente/v1',sedesRutas);
        router.use('/ne-gestion-reportes/bstk/servicio-al-cliente/v1',reportesRutas);
        router.use('/ne-gestion-pagos/bstk/servicio-al-cliente/v1',pagosRutas);
        
}

module.exports = routerApi;