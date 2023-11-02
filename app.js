const express = require('express')
const Products = require('./models/Product')

const app = express()

require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/conexion')
const productsRouter = require('./routes/products')

// Creo el middleware que me lee el json para que, después, lo traduzca el express.json()
app.use(express.urlencoded({ extended: true}))

// Creo el middleware que me transforma los json que me llegan desde los formularios a objeto
app.use(express.json())

app.set('view engine', 'ejs')

// PROBAMOS 1- Pasar datos de usuario al body del home
const usuario = {
    nombre:'pedro',
    apellido:'pepe',
    admin: true,
}

// PROBAMOS 2- Pasar datos desde un array con objetos que contienen información o producto al body del home
const posts=[
    {title: 'Title 1', body: 'Body 1'},
    {title: 'Title 2', body: 'Body 2'},
    {title: 'Title 3', body: 'Body 3'},
    {title: 'Title 4', body: 'Body 4'},
]
 
// ------------------------------- RUTAS -----------------------------//


// localhost:4600/
app.get('/', (req, res) => {

    // TRAEMOS - PROBAMOS 1 - Pasamos datos de usuario al body
    //res.render('home', {usuario:usuario})

    // TRAEMOS - PROBAMOS 2 - Pasamos datos los datos del usuario y  del array al body
   res.render('home', {usuario:usuario, articulos:posts})   
});



// localhost:4600/pepe
app.use('/pepe', productsRouter)


// ------------------------------- CONEXIÓN BASE DE DATOS -----------------------------//



const unPuerto = process.env.PUERTO

const iniciar = async () => {
    try {
       await connectDB(process.env.MONGO_URL) 
       app.listen(unPuerto, console.log('Servidor ejecutándose'))
    } catch (error) {
        console.log(error)
    }
}

iniciar()