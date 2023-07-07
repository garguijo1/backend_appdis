const con = require('../conexion/conexion.js');

class categoriasServices{
    constructor(){
        this.con = con;
    }

    async find(){
        const query = 'SELECT id_categoria, categoria FROM categorias;';
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
        const query = 'INSERT INTO categorias(categoria) VALUES(?)'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.categoria
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
        const query = 'SELECT id_categoria, categoria FROM categorias WHERE id_categoria =  ?';
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
        const query = 'UPDATE categorias SET categoria = ? WHERE id_categoria = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                changes.categoria,
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
        const query = 'DELETE FROM categorias WHERE id_categoria = ?';
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


module.exports = categoriasServices;