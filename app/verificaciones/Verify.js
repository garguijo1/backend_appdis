const express = require('express');
const con = require('../conexion/conexion.js');
const crypto = require('crypto');

class verify{
    constructor(){
        this.con = con;
    }


    async validarToken(token){
        const query = 'SELECT id_persona,id_rol,token FROM view_personas WHERE token = ?;';
         return new Promise((res, rej) =>{
            this.con.query(query,[token],
                (error, datos) =>{
                    if(!error){
                        if(datos.length > 0){
                            res(datos);
                        }else{
                            res(false);
                        }
                        
                    }else{
                        res(error);
                    }
                }
            );
        });
    }

    async permiso(rol,accion){
        const query = 'SELECT id_permiso FROM permisos WHERE id_rol = ? and id_accion = ?;';

         return new Promise((res, rej) =>{
            this.con.query(query,[rol,accion],
                (error, datos) =>{
                    if(!error){
                        // console.log("datos_permiso: ",datos.length);
                        if(datos.length > 0){
                            res(true);
                        }else{
                            res(false);
                        }
                        
                    }else{
                        res(error);
                    }
                }
            );
        });
    }

    async infoAccion(id_accion){
        const query = 'SELECT url, metodo FROM acciones WHERE id_accion = ?;';

         return new Promise((res, rej) =>{
            this.con.query(query,[id_accion],
                (error, datos) =>{
                    if(!error){
                        console.log(datos);
                        res(datos);
                    }else{
                        res(error);
                    }
                }
            );
        });
    }

}


module.exports = verify;
