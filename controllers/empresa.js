const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {

    //Condiciones del get
    const query = { estado: true };

    const listaEmpresas = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query).populate('sucursales', 'nombre')
    ]);
    
    res.status(201).json(listaEmpresas)

}

const getMiEmpresa = async (req = request, res = response) => {
    const _id = req.usuario.id;
    
    const listaEmpresas = await Empresa.findById(_id).populate('sucursales', 'nombre')
    
    res.status(201).json(listaEmpresas)

}

const postEmpresa = async (req = request, res = response) => {
    const { nombre, correo, password, tipo, sucursales, ...body } = req.body;
    const empresaDBguardada = new Empresa({ nombre, correo, password, tipo, sucursales });
    const empresaDB = await Empresa.findOne({ nombre: nombre });
    const salt = bcrypt.genSaltSync();
    empresaDBguardada.password = bcrypt.hashSync(password, salt);
    // Validacion si la empresa ya existe
    if (empresaDB) {
        return res.status(400).json({
            msg: `La empresa ${empresaDB.nombre} ya existe en la DB`
        })
    } else {
        if(sucursales){
        let valorRepetido;
        for (let i = 0; i < sucursales.length; i++) {
            for (let j = i + 1; j < sucursales.length; j++) {
                if (sucursales[i] === sucursales[j]) {
                    valorRepetido = sucursales[i];
                    break;
                }
                }
            
        }
        if (valorRepetido) {
            res.status(400).json(`La sucursal con el id: ${valorRepetido} esta repetida`)
        }else{
            await empresaDBguardada.save();
            res.status(201).json(empresaDBguardada);
        }
    }else{
        await empresaDBguardada.save();
        res.status(201).json(empresaDBguardada);
    }
        //Guardar en la DB
       
    }
}


const putEmpresa = async (req = request, res = response) => {
    const _id = req.usuario.id;
    const { correo, ...resto } = req.body;
    if(resto.sucursales){
        let valorRepetido;
        for (let i = 0; i < resto.sucursales.length; i++) {
            for (let j = i + 1; j < resto.sucursales.length; j++) {
                if (resto.sucursales[i] === resto.sucursales[j]) {
                    valorRepetido = resto.sucursales[i];
                    break;
                }
                }
            
        }
        if (valorRepetido) {
            res.status(400).json(`La sucursal con el id: ${valorRepetido} esta repetida`)
        }else{
        //Editar al Curso por el id
        const empresaEditada = await Empresa.findByIdAndUpdate(_id, resto);
        res.status(201).json(empresaEditada);
        }
    

}
}


const deleteEmpresa = async (req = request, res = response) => {
    const _id = req.usuario.id;

    //Eliminar fisicamente de la DB
    const empresaEliminada = await Empresa.findByIdAndDelete(_id);

    // //Eliminar cambiando el estado a false
    // const empresaEliminada = await Curso.findByIdAndUpdate(id, {estado: false},{ new: true });

    res.status(201).json(empresaEliminada);
}


module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    getMiEmpresa
}


// CONTROLADOR