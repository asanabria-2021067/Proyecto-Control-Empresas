const Tipo = require('../models/tipo-empresa');
const Empresa = require('../models/empresa');
const TiposExisten = require('../controllers/tipo');
//Este archivo maneja validaciones personalizadas

const esTipoValido = async( tipo = '' ) => {

    const existeTipo = await Tipo.findOne( { tipo } );

    if ( !existeTipo ) {
        throw new Error(`El tipo ${ tipo } no está registrado en la DB`)
        // throw new Error(`El tipo ${ tipo } no está registrado en la DB, seleccione uno de los siguientes tipos:
        // ${TiposExisten.tiposExistentes}`,);
    }

}


const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Empresa.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}


module.exports = {
    esTipoValido,
    emailExiste,
}
