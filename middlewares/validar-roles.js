const { response } = require("express");


const esAdminRole = (req, res= response, next) => {

    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere vertificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `No es un administrador - No puede hacer esto: Usuario ${nombre} `
        })
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if(!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere vertificar el role sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }


        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}