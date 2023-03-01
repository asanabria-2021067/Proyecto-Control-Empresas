const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { buscar } = require('../controllers/buscar');
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

//Manejo de rutas
router.get('/:coleccion/:termino' ,buscar);


module.exports = router;