const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Tipo = require('../models/tipo-empresa');
const getTipos = async (req = request, res = response) => {
    //Condiciones del get
    const query = { estado: true };

    const listaTipos = await Promise.all([
        Tipo.countDocuments(query),
        Tipo.find(query)
    ]);

    res.status(201).json(listaTipos)
}

const postTipo = async (req = request, res = response) => {
    const { tipo, ...body } = req.body;

    const tipoDB = await Tipo.findOne({ tipo: tipo });
    // Validacion si la empresa ya existe
    if (tipoDB) {
        return res.status(400).json({
            msg: `El tipo ${tipoDB.tipo} ya existe en la DB`
        })
    } else {
        const tipoGuardadoDB = new Tipo({ tipo });
        //Guardar en la DB
        await tipoGuardadoDB.save();
        res.status(201).json(tipoGuardadoDB);
    }
}


const putTipo = async (req = request, res = response) => {
    const {id} = req.params;
    const { ...resto } = req.body;

    //Editar al Curso por el id
    const tipoEditado = await Tipo.findByIdAndUpdate(id, resto);

    res.status(201).json(tipoEditado);

}


const deleteTipo = async (req = request, res = response) => {
    const {id} = req.params;
    //Eliminar fisicamente de la DB
    const tipoEliminado = await Tipo.findByIdAndDelete(id);
    res.status(201).json(tipoEliminado);
}


module.exports = {
    getTipos,
    postTipo,
    putTipo,
    deleteTipo,
}


// CONTROLADOR