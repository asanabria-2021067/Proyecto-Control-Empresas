const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Sucursal = require('../models/sucursales');
const Empresa = require('../models/empresa');
const getSucursales = async (req = request, res = response) => {

    //Condiciones del get
    const query = { estado: true };

    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query)
    ]);

    res.status(201).json(listaSucursales)

}

const postSucursal = async (req = request, res = response) => {
    const { nombre,ubicacion, ...body } = req.body;

    const sucursalDB = await Sucursal.findOne({ nombre: nombre });
    // Validacion si la empresa ya existe
    if (sucursalDB) {
        return res.status(400).json({
            msg: `La sucursal ${sucursalDB.nombre} ya existe en la DB`
        })
    } else {
        const sucursalDB = new Sucursal({ nombre,ubicacion});
        //Guardar en la DB
        await sucursalDB.save();
        res.status(201).json(sucursalDB);
    }
}


const putSucursal = async (req = request, res = response) => {
    const {id} = req.params;
    const { ...resto } = req.body;
    // console.log("Parametro", id);
    // const idEmpresa = req.usuario.id;
    // console.log("TOKEN", idEmpresa);
    // const buscador = Empresa.find({id: idEmpresa}, [{sucursales: id}]);
    // console.log("Buscador", buscador);
    
    // if(buscador){
    //     res.status(404).json(`La sucursal con el id: ${id}, no pertenece a su empresa`)
    // }else{
        const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto);
        res.status(201).json(sucursalEditada);
    // }
   

    //Editar al Curso por el id
    

}


const deleteSucursal = async (req = request, res = response) => {
    const {id} = req.params;
    //Eliminar fisicamente de la DB
    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);
    res.status(201).json(sucursalEliminada);
}


module.exports = {
    getSucursales,
    postSucursal,
    putSucursal,
    deleteSucursal,
}


// CONTROLADOR