const con = require('../conexion/conexion.js');

class platillosServices{
    constructor(){
        this.con = con;
    }

    async find(){
        const query = 'select id_categoria, categoria from categorias;';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    if(!error){
                        res(datos);
                    }else{
                        res(error);
                    }
                   
                }
            );
        });
    }
}


module.exports = platillosServices;