const { Producto } = require('../models');
const Categoria  = require('../models/categoria');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la BD`)
    }

}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario) {
        throw new Error(`El id del usuario no existe: ${id}`);
    }
}


const existeCategoria = async (id) => {

    const categoria = await Categoria.findById(id);

    if(!categoria) {
        throw new Error(`El id de la categoria no existe: ${id}`);
    }
}

const existeProducto = async (id) => {

    const producto = await Producto.findById(id);

    if(!producto) {
        throw new Error(`El id del producto no existe: ${id}`);
    }
}

const esNumerico = async (number) => {
    if(isNaN(number)){
        throw new Error(`El valor ${number} no es numérico`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    esNumerico
}
