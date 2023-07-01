const con = require('../conexion/conexion.js');
const crypto = require('crypto');

class usuariosServices{
    constructor(){
        this.con = con;
    }

    async create(data){
        const query = 'INSERT INTO usuarios(usuario,pass,nombre,apellido,id_rol,id_sede,created_at,estado)VALUES (?,?,?,?,?,?,?,1);';

        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hoy =  year+"-"+month+"-"+day;

       
        const final_pass = crypto.createHash('sha256').update(data.pass).digest('hex');

        console.log("hasheado: ",final_pass);


        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.usuario,
                final_pass,
                data.nombre,
                data.apellido,
                data.id_rol,
                data.id_sede,
                hoy,
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
        const query = 'SELECT id_usuario, id_rol,id_sede, usuario,nombre,pass FROM usuarios WHERE usuario = ? ';
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

    async guardarToken(token,id){
        const query = 'UPDATE usuarios SET token = ?WHERE id_usuario = ?; ';
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

    async login(data){
        const validar_pass = crypto.createHash('sha256').update(data.pass).digest('hex');
        let token = this.generarToken();
        const infoLog = await this.traerPass(data);
        if(infoLog.length > 0){
            if(validar_pass === infoLog[0].pass){

                let res = this.guardarToken(token,infoLog[0].id_usuario);
                infoLog[0].token = token;
                if(res){
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
        }else{
            return ({
                "mensaje" : "usuario no encontrado",
                "data" : []
            }); 
        }
        
       
    }

    async deslogin(id){
        const query = 'UPDATE usuarios SET token = null WHERE id_usuario = ?;';
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

    generarToken(){
        const resetToken = crypto.randomBytes(20).toString('hex');
        const token =  crypto.createHash('sha256').update(resetToken).digest('hex');
        
        return token;
    }

    async find(){
        const query = 'SELECT * FROM usuarios';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async findOne(id){
        const query = 'SELECT * FROM usuarios WHERE id_usuario =  ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async menu(rol){
        const query = 'SELECT p.id_menu, m.texto, m.url FROM permisos_menu AS p INNER JOIN menu AS m ON m.id_menu = p.id_menu WHERE id_rol = ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[rol],
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async update(id, changes){
        
    }

    async delete(id){
       
    }

}


module.exports = usuariosServices;
