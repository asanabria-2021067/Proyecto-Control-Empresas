const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio' ]
    },
    tipo: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    rol: {
        type: String,
        default: 'EMPRESA_ROLE',
    },
    sucursales:[{
        type: Schema.Types.ObjectId,
        ref: 'Sucursales',
        default: ['']
    }],
});


module.exports = model('Empresa', EmpresaSchema);