const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },

    availability: {
        type: Boolean,
        required: true,
        default: true
    },  

    timeCust: {
        type: String,
        required: true,
        default: '24H | R$ 15,00'
    },

    description: {
        type: String,
        required: true,
    },
    
    itensImages: {
        type: String,
        required: true,
        trim: true,
    },
    
    delivery : {
        type: String,
        require: true,
        default: 'Disponivel'
    },

    location: {
        type: {
            type: String,
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profiles'
    }
})

module.exports = mongoose.model('Itens', schema);