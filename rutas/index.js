const express = require('express');

const platillosRutas = require('./platillosRutas.js');
const clientesRutas = require('./clientesRutas.js');
const usuariosRutas = require('./usuariosRutas.js');
const reservacionesRutas = require('./reservasRutas.js');
const categoriasRutas = require('./categoriasRutas.js');
const sedesRutas = require('./sedesRutas.js');

function routerApi(app){
    const router = express.Router();
    app.use('/',router);
        router.use('/ux-gestion-platillos/bstk/servicio-al-cliente/v1',platillosRutas);
        router.use('/clientes',clientesRutas);
        router.use('/usuarios',usuariosRutas);
        router.use('/reservaciones',reservacionesRutas);
        router.use('/categorias',categoriasRutas);
        router.use('/sedes',sedesRutas);
}

module.exports = routerApi;