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

    async create(data){
        const query = 'INSERT INTO sedes(sede, ubicacion, foto) VALUES(?, ?, ?)'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.sede,
                data.ubicacion,
                data.foto
            ],
        
                (error, data) =>{
                    if(!error){
                        res(true);
                    }else{
                        console.log(error);
                        res(false);
                    }
                   
                }
    
            );
        });
        
    }

    async findOne(id){
        const query = 'SELECT id_sede, sede, ubicacion,foto FROM sedes WHERE id_sede = ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    if(!error){
                        res(datos);
                    }else{
                        res(error)
                    }
                    
                }
            );
        });
    }

    async update(id, changes){
        const query = 'UPDATE sedes SET sede = ?, ubicacion = ?, foto = ? WHERE id_categoria = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                changes.sede,
                changes.ubicacion,
                changes.foto,
                id
            ],(error, data) =>{
                    if(!error){
                        res(true);
                    }else{
                        console.log(error);
                        rej(false);
                    }
                }
    
            );
        });
    }

    async delete(id){
        const query = 'DELETE FROM sedes WHERE id_sede = ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    if(!error){
                        res(true);
                    }else{
                        console.log(error);
                        res(false);
                    }
                }
            );
        });
    }
}


module.exports = sedesServices;