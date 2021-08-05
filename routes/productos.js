const {Router} = require('express');
const {check} = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const { existeProducto, existeCategoria, esNumerico } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);



router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es requerida').not().isEmpty(),
    check('categoria').custom(existeCategoria),
    check('categoria', 'El id de la categoria no es válido').isMongoId(),
    check('precio').custom(esNumerico),
    validarCampos
], crearProducto);


router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es requerida').not().isEmpty(),
    check('categoria').custom(existeCategoria),
    check('categoria', 'El id de la categoria no es válido').isMongoId(),
    check('precio').custom(esNumerico),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);


module.exports = router;