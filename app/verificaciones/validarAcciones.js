const verify = require("./Verify");
const validador = new verify();

async function validarAccion( req, res, next){

    let id_accion;
    if(req.body.accion){
        id_accion = req.body.accion;
    }else{
        id_accion = req.query.accion;
    }

    req.id_accion = id_accion

    let info = await validador.infoAccion(id_accion)
    console.log(info[0]);

    if(info.length > 0){
        let regEx = new RegExp(info[0].url);
        console.log(regEx);
        if(regEx.test(req.originalUrl) && info[0].metodo == req.method ){
            next();
        }else{
            res.status(500).json({
                message: 'accion incorrecta'
            });
        }
    }else{
        res.status(500).json({
            message: 'accion no permitida'
        });
    }
}

module.exports = validarAccion;