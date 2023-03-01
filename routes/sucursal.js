const { Router } = require('express');
const { check } = require('express-validator');
const { tieneRole } = require('../middlewares/validar-rol');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { postSucursal, putSucursal, deleteSucursal, getSucursales } = require('../controllers/sucursal');

const router = Router();
router.get('/mostrar' ,getSucursales);

router.post('/agregar', [
    validarJWT,
    tieneRole('EMPRESA_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ubicacion', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] ,postSucursal);

router.put('/editar/:id', [
    validarJWT,
    tieneRole('EMPRESA_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ubicacion', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] ,putSucursal);

router.delete('/eliminar/:id', [
    validarJWT,
    tieneRole('EMPRESA_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
] ,deleteSucursal);



module.exports = router;


// ROUTES