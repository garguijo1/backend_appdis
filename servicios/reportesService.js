const con = require('../conexion/conexion.js');

class reportesService{
    constructor(){
        this.con = con;
    }

    async platillos_mas_solicitados(categorias){

        let str_categorias = '(';
        if(categorias.length == 0) str_categorias += `SELECT id_categoria FROM categorias`;
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
   
}


module.exports = reportesService;