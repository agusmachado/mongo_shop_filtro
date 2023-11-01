// - EL MODELO - Es el esquema de cada una de las propiedades que vamos a tener en nuestra BD

const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Nombre del producto']
    },
    price:{
        type:Number,
        required:[true, 'Nombre del producto']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:5,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
        values:['ikea', 'liddy', 'caressa', 'marcos'],
        message:'{value} no tiene stock'
        }
    }
    
})

module.exports = mongoose.model('Product', productSchema)

