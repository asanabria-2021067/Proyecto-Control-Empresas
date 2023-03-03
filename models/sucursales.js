const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El tipo es obligatorio']
    },
    ubicacion: {
        type: String,
        required: [true , 'La ubicacion es obligatoria']
    },
    estado:{
        type: Boolean,
        default: true,
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref: 'Empresas'
    }
});


module.exports = model('Sucursales', SucursalSchema);