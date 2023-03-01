const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Sucursal = require('../models/sucursales');

const coleccionesPermitidas = [
    'sucursales',
];


const buscarSucursales = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );  //TRUE
    console.log( esMongoID) 
    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        console.log( sucursal) 
        return res.json({
            //results: [ usuario ]
            results: ( sucursal ) ? [ sucursal ] : [] 
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    }

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');

    const sucursal = await Sucursal.find({
        $or: [ { nombre: regex }, { ubicacion: regex } ],
        $and: [ { estado: true } ]
    });
    console.log("A",sucursal);
    res.json({
        results: sucursal
    })

}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case 'sucursales':
            buscarSucursales(termino, res);
        break;
        default:
            res.status(500).json({
                msg: 'La coleccion no existe'
            });
        break;
    }

}


module.exports = {
    buscar
}