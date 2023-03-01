const { Router } = require('express');
const { check } = require('express-validator');
// const { tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { postTipo, putTipo, deleteTipo, getTipos } = require('../controllers/tipo');

const router = Router();

router.post('/agregar', [
    check('tipo', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] ,postTipo);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('tipo', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] ,putTipo);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
] ,deleteTipo);

router.get('/mostrar' ,getTipos);


module.exports = router;


// ROUTES