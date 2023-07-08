const con = require('../conexion/conexion.js');

class reportesService{
    constructor(){
        this.con = con;
    }

    async platillos_mas_solicitados(categorias){

        let str_categorias = '(';
        if(!categorias || categorias.length == 0) str_categorias += `SELECT id_categoria FROM categorias`;
        else{
            categorias.forEach(c => {
                str_categorias += `${c},`;
            });
            str_categorias = str_categorias.slice(0,-1);
        }
        str_categorias += ')';
        const query = `
            SELECT 	rp.id_platillo 	id_platillo,
                    p.nombre 		nombre_platillo,
                    p.id_categoria 	id_categoria_platillo,
                    c.categoria     categoria_platillo,
                    COUNT(*) 	    cantidad 
              FROM 	reservaciones_platillos rp 
              JOIN 	platillos p  ON  p.id_platillo  = rp.id_platillo
              JOIN  categorias c ON  c.id_categoria = p.id_categoria
             WHERE  p.id_categoria IN ${str_categorias}
          GROUP BY 	rp.id_platillo, p.id_categoria
          ORDER BY	5
        `;

        console.log(query);

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

    async reservas_sede(mes){
        const query = `SELECT r.id_sede, s.sede ,COUNT(*) cantidad FROM reservaciones AS r 
        JOIN sedes AS s ON r.id_sede = s.id_sede 
        WHERE MONTH( r.fecha) = ? AND YEAR(r.fecha) = YEAR(NOW()) GROUP BY 1 ORDER BY 3;`;
        return new Promise((res, rej) =>{
            this.con.query(query,[mes],
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

    async cinco_meses_sede(id){
        const query = `SELECT MONTH(fecha) numero_mes,date_format(fecha, '%M' ) mes, count(*) cantidad FROM reservaciones 
        WHERE id_sede = ?
        AND MONTH(fecha) <= MONTH(NOW()) 
        AND MONTH(fecha) > MONTH(NOW()) - 5 
        AND YEAR(fecha) = YEAR(NOW()) 
        GROUP BY 1,2`;
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
}


module.exports = reportesService;