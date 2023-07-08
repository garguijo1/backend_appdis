const con = require('../conexion/conexion.js');

class reservasServices{
    constructor(){
        this.con = con;
    }

    async create(data){
        const query = 'INSERT INTO reservaciones(sillas,atendido,id_cliente,id_sede,fecha,hora,estado) VALUES (?,0,?,?,?,?,1);'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.sillas,
                data.id_cliente,
                data.id_sede,
                data.fecha,
                data.hora
            ],(error, data) =>{
                    if(!error){
                        res(data);
                    }else{
                        console.log(error);
                        res(false);
                    }  
                }
            );
        });
        
    }

    async addPlatillo(data){
        console.log('desde el service : ',data)
        const query = 'INSERT INTO reservaciones_platillos(id_platillo,id_reservacion,cantidad) VALUES (?,?,?);'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.id_platillo,
                data.id_reservacion,
                data.cantidad,
            ],(error, data) =>{
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
        const query = 'SELECT r.id_reservacion,r.sillas,r.atendido,r.id_cliente,c.nombre,r.id_sede,s.sede,r.fecha FROM reservaciones AS r INNER JOIN sedes as s on s.id_sede = r.id_sede INNER JOIN clientes AS c ON c.id_cliente = r.id_cliente;';
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

    async findFilter(data){
        const query = 'SELECT r.id_reservacion, r.sillas,r.atendido,s.sede,s.ubicacion,r.fecha FROM reservaciones AS r INNER JOIN sedes AS s ON r.id_sede = s.id_sede WHERE r.id_sede = ? AND r.fecha BETWEEN ? AND ?;' ;
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.id_sede,
                data.fecha_inicial,
                data.fecha_final
            ],
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
        const query = 'SELECT r.id_reservacion,r.sillas,r.atendido,s.sede,s.ubicacion,r.fecha FROM reservaciones as r INNER JOIN sedes as s ON r.id_sede = s.id_sede WHERE r.id_reservacion = ?;';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
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

    async findClient(id){
        const query = `
        SELECT r.id_reservacion, r.sillas, r.atendido, s.sede, s.ubicacion, DATE_FORMAT(r.fecha, "%d/%m/%Y") fecha, r.fecha AS fecha_orden, r.hora 
        FROM reservaciones AS r 
        INNER JOIN sedes as s ON r.id_sede = s.id_sede 
        WHERE r.id_cliente = ?
        ORDER BY 7 DESC`;
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
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

    async findSede(id){
        const query = 'SELECT id_reservacion,sillas,atendido,fecha FROM reservaciones WHERE id_sede = ?;';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
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


    async atender(id){
        const query = 'UPDATE reservaciones SET atendido = 1 WHERE id_reservacion = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[id],(error, data) =>{
                    if(!error) res(true);
                    else rej(false);
                });
        });
    }

    async cancelar(id){
        const query = 'UPDATE reservaciones SET estado = 0 WHERE id_reservacion = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[id],(error, data) =>{
                    if(!error) res(true);
                    else rej(false);
                });
        });
    }

    async delete(id){
        const query = 'DELETE FROM reservaciones WHERE id_reservacion = ?';
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

    async validarHorario(id_sede,horario){
        const query = 'SELECT COUNT(r.id_reservacion) AS cantidad, s.mesas FROM reservaciones as r INNER JOIN sedes AS s ON r.id_sede = s.id_sede WHERE r.fecha LIKE ? AND r.id_sede = ?;';
        return new Promise((res, rej) =>{
            this.con.query(query,[horario,id_sede],
                (error, datos) =>{
                    if(!error){
                        res(datos);
                    }else{
                        console.log(error);
                        res(error);
                    }
                    
                }
            );
        });
    }

    async detalleReserva(id){
        const query = 'SELECT rp.id_platillo, p.nombre,p.precio,p.foto,rp.cantidad FROM reservaciones_platillos AS rp INNER JOIN platillos AS p ON rp.id_platillo = p.id_platillo WHERE id_reservacion = ?;';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    if(!error){
                        res(datos);
                    }else{
                        console.log(error);
                        res(false);
                    }
                }
            );
        });
    }

}


module.exports = reservasServices;