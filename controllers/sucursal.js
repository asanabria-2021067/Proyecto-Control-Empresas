const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Sucursal = require('../models/sucursales');
const Empresa = require('../models/empresa');
const municipios = [
    "Amatitlán",
    "Chinautla",
    "Chuarrancho",
    "Fraijanes",
    "Guatemala",
    "Mixco",
    "Palencia",
    "San Miguel Petapa",
    "San José del Golfo",
    "San José Pinula",
    "San Juan Sacatepéquez",
    "San Pedro Ayampuc",
    "San Pedro Sacatepéquez",
    "San Raymundo",
    "Santa Catarina Pinula",
    "Santa Cruz Naranjo",
    "Villa Canales",
    "Villa Nueva"
  ];
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
    const { estado, ...body } = req.body;
    const _id = req.usuario.id;
    // Validacion si la empresa ya existe
    const sucursalDB = await Sucursal.findOne({ nombre: body.nombre });
    console.log("Sucursal", sucursalDB);
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        empresa: _id
    }
    if (sucursalDB) {
        return res.status(400).json({
            msg: `La sucursal ${sucursalDB.nombre} ya existe en la DB`
        })
    } else {
        if(municipios.includes(body.ubicacion)){
            const sucursalDB = new Sucursal(data);
            //Guardar en la DB
            await sucursalDB.save();
            res.status(201).json(sucursalDB);
            await Empresa.findByIdAndUpdate(_id, {$push: { sucursales:[sucursalDB._id]}})
        }else{
            res.status(400).json({
                msg: `La ubicacion ${body.ubicacion} no esta registrada o esta mal escrita. Ejemplo: Villa Nueva`
            })
        }
    }
}


const putSucursal = async (req = request, res = response) => {
    const {id} = req.params;
    const { ...resto } = req.body;
    console.log("Parametro", id);
    const idEmpresa = req.usuario.id;
    console.log("TOKEN", idEmpresa);
    //const buscador = Empresa.find({id: idEmpresa}, [{sucursales: {id}}]);
    //  const buscador = Empresa.find({id: idEmpresa},{$in:[{sucursales: id}]});
    // const buscador = await Sucursal.find({empresa: idEmpresa});
    const buscador = await Sucursal.findById(id);
    console.log("Buscador", buscador);
    const sucursalDB = await Sucursal.findOne({ nombre: resto.nombre });
    console.log("Sucursal", sucursalDB);
    // Validacion si la empresa ya existe
    if(buscador.empresa != idEmpresa) {
       res.status(404).json(`La sucursal con el id: ${id}, no pertenece a su empresa`)
    }else{
        // {
        if (sucursalDB) {
             return res.status(400).json({
                msg: `La sucursal ${sucursalDB.nombre} ya existe en la DB`
            })
        } else {
            if(municipios.includes(resto.ubicacion)){
                const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto);
                res.status(201).json(sucursalEditada);
    
            }else{
                res.status(400).json({
                    msg: `La ubicacion ${resto.ubicacion} no esta registrada o esta mal escrita. Ejemplo: Villa Nueva`
                })
            }
        }
        
    }

}


const deleteSucursal = async (req = request, res = response) => {
    const {id} = req.params;
    const _id = req.usuario.id;
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