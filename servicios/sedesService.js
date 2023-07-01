const con = require('../conexion/conexion.js');

class sedesServices{
    constructor(){
        this.con = con;
    }

    async find(){
        const query = 'SELECT id_sede, sede, ubicacion,foto FROM sedes;';
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


module.exports = sedesServices;