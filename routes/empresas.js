const { Router } = require('express');
const { check } = require('express-validator');
// const { tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, esTipoValido } = require('../helpers/db-validators');
const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('tipo', 'El tipo de empresa es obligatorio').not().isEmpty(),
    check('tipo').custom(esTipoValido),
    check('sucursales', 'Las sucursales son obligatorias').not().isEmpty(),
    validarCampos,
] ,postEmpresa);

router.put('/editar/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('tipo').custom(esTipoValido),
    check('sucursales', 'Las sucursales son obligatorias').not().isEmpty(),

    validarCampos
] ,putEmpresa);


router.delete('/eliminar/', [
    validarJWT,
    validarCampos
] ,deleteEmpresa);


module.exports = router;


// ROUTES