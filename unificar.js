// - UNIFICAR me sirve para subir la primera info o la de testing a mi BD

require('dotenv').config()

const connectDB = require('./db/conexion')

const Product = require('./models/Product')

const jsonProduct = require('./products.json')

// Testing
// Esta función se conecta a la DB, elimina todo lo que hay en la DB y sube la info nueva a la DB
const iniciar = async () => {
    try {
       await connectDB(process.env.MONGO_URL)
       await Product.deleteMany()
       //await Product.updateOne()
       //await Product.updateMany([{},{}])
       await Product.create(jsonProduct)
       console.log('Se efectuó el cambio') 
    } catch (error) {
        console.log(error)
    }
}

iniciar()

// Este archivo se ejecuta manualmente y yo decido cuando hacerlo escribiendo en la Terminal node unificar y se ejecuta una sola vez
// node unificar