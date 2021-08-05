const { response } = require("express");
const {Producto, Categoria} = require("../models");

const obtenerProductos = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;

    const query  = { estado:true }


    // Ejecutar promesas al mismo tiempo
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.json({
        total,
        productos
    });
}

const obtenerProducto = async(req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json({
        producto
    });
}

const crearProducto = async(req, res = response) => {

    const {nombre, precio, categoria, descripcion, disponible} = req.body;

    const productoDB = await Producto.findOne({nombre});
    
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    const verificarCategoria = await Categoria.findById(categoria);

    if(!verificarCategoria) {
        return res.status(400).json({
            msg: `La categoria con el id  ${categoria}, no existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        precio,
        categoria,
        descripcion,
        disponible, 
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);

} 


const actualizarProducto = async(req, res = response) => {
    const {id} = req.params;
    const {_id, usuario, estado, ...productoUpdate} = req.body;
    
    const producto = await Producto.findByIdAndUpdate(id, productoUpdate, {new: true});
    
    res.json({
        producto
    });
}


const borrarProducto = async(req, res = response) => {
    const {id} = req.params;
    const query = {estado: false};

    const producto = await Producto.findByIdAndUpdate(id, query, {new: true});

    res.json({
        producto
    });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}