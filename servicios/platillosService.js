const con = require('../conexion/conexion.js');

class platillosServices{
    constructor(){
        this.con = con;
    }

    async create(data){
        const query = 'INSERT INTO platillos(nombre,descripcion,precio,foto,id_categoria) VALUES(?,?,?,?,?)'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.nombre,
                data.descripcion,
                data.precio,
                data.foto,
                data.id_categoria
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

    async find(){
        const query = 'SELECT p.id_platillo, p.nombre, p.descripcion, p.precio, p.foto, p.id_categoria, c.categoria FROM platillos as p INNER JOIN categorias as c ON p.id_categoria = c.id_categoria;';
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

    async findOne(id){
        const query = 'SELECT p.id_platillo, p.nombre, p.descripcion, p.precio, p.foto, p.id_categoria, c.categoria FROM platillos as p INNER JOIN categorias as c ON p.id_categoria = c.id_categoria WHERE p.id_platillo =  ?';
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
        const query = 'UPDATE platillos SET nombre = ?, precio = ? ,descripcion = ?,id_categoria = ?, foto = ? WHERE id_platillo = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                changes.nombre,
                changes.precio,
                changes.descripcion,
                changes.id_categoria,
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
        const query = 'DELETE FROM platillos WHERE id_platillo = ?';
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


module.exports = platillosServices;