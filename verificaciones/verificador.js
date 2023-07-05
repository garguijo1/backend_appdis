const verify = require("./Verify");
const validador = new verify();

async function validar(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        let persona = await validador.validarToken(bearerToken);
        if(persona.length > 0){
            let permiso = true
            if(permiso){
                next();
            }else{
                res.status(401).json({
                    message: 'No tiene permiso para esta funcion'
                });
            }
        }else{
            res.status(401).json({
                message: 'protegido'
            });
        }
    }else{
        console.log('no hay token');
        res.sendStatus(401);
    }
}

module.exports = validar;