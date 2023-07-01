const con = require('../conexion/conexion.js');
const crypto = require('crypto');

class clientesServices{
    constructor(){
        this.con = con;
    }

    async create(data){
        const final_pass = crypto.createHash('sha256').update(data.pass).digest('hex');

        const query = 'INSERT INTO clientes(usuario,pass,nombre,telefono,dni,correo,id_rol) VALUES(?,?,?,?,?,?,2)'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.usuario,
                final_pass,
                data.nombre,
                data.telefono,
                data.dni,
                data.correo
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

    async traerPass(data){
        const query = 'SELECT id_cliente, usuario, nombre, pass FROM clientes WHERE usuario = ? ';
         return new Promise((res, rej) =>{
            this.con.query(query,[data.usuario],
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


    async login(data){
        const validar_pass = crypto.createHash('sha256').update(data.pass).digest('hex');
        let token = this.generarToken();
        const infoLog = await this.traerPass(data);

        if(validar_pass === infoLog[0].pass){

            let res = this.guardarToken(token,infoLog[0].id_cliente);

            if(res){
                infoLog[0].token = token;
                return ({
                    "mensaje" : "sesion iniciada correctamente",
                    "data" : infoLog[0]
                });
            }else{
                return ({
                    "mensaje" : "error en el inicio de sesion",
                    "data" : []
                });
            }

            
        }else{
            return ({
                "mensaje" : "contraseña incorrecta",
                "data" : []
            }); 
        }
       
    }

    generarToken(){
        const resetToken = crypto.randomBytes(20).toString('hex');
        const token = crypto.createHash('sha256').update(resetToken).digest('hex');
        return token;
    }

    async guardarToken(token,id){
        const query = 'UPDATE clientes SET token = ?WHERE id_cliente = ?; ';
        return new Promise((res, rej) =>{
           this.con.query(query,[token,id],
               (error, datos) =>{
                   if(!error){
                       res(true);
                   }else{
                       res(false);
                   }
               }
           );
       });
    }

    async find(){
        const query = 'SELECT id_cliente, usuario, nombre, telefono, correo FROM clientes';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async findOne(id){
        const query = 'SELECT id_cliente, usuario, nombre, telefono, correo FROM clientes WHERE id_cliente =  ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async update(id, changes){
        const query = 'UPDATE clientes SET usuario = ?, nombre = ?, telefono = ? ,correo = ?,dni = ? WHERE id_cliente = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                changes.usuario,
                changes.nombre,
                changes.telefono,
                changes.correo,
                changes.dni,
                id
            ],(error, data) =>{
                    if(!error){
                        res(true);
                    }else{
                        throw new Error(error.message);
                        rej(false);
                    }
                   
                }
    
            );
        });
    }

    async delete(id){
        const query = 'DELETE FROM clientes WHERE id_cliente = ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    if(!error){
                        res(true);
                    }else{
                        res(false);
                    }
                }
            );
        });
    }

}


module.exports = clientesServices;
