const Product = require("../models/Product")

// - FORMA ESTÁTICA - Se usa menos
const getAllProductStatics = async (req, res) =>{

    // PROBAMOS 1 - con .find({}) y, al darle llaves vacías, le pedimos que todo lo que encuentre, lo traiga
    // const products = await Product.find({})

    // PROBAMOS 2 - con .find({featured:true}) y le pedimos que nos traiga todo lo que tenga --- featured:true
    //const products = await Product.find({featured:true})

    // PROBAMOS 3 - con .find({name:'wooden desk'}) y le pedimos que nos traiga todo lo que tenga --- name:'wooden desk'
    const products = await Product.find({name:'wooden desk'})

    // RESPUESTA - Recibimos la respuesta que pedimos entre las {} - Primero pedimos el listado de productos con featured:true y, después, pedimos la cantidad de productos que hemos traído, o sea, los que tienen la característica featured:true
    res.status(200).json({products, numProducts:products.length})
}

const getAllLiddy = async (req, res) =>{
    const products = await Product.find({company:'liddy'})
    res.status(200).json({products, numProducts:products.length})
}

const getAllIkea = async (req, res) =>{
    const products = await Product.find({company:'ikea'})
    
    //Cuando verificamos que ya está todo ok, comentamos el res.status(200)
    //res.status(200).json({products, numProducts:products.length})
    res.render('ikea', {products:products})
}


// - FORMA DINÁMICA - Es la forma que más se utiliza

// localhost:4600/pepe
const getAllProduct = async (req, res) => {
    // console.log(req.query)
    const products = await Product.find(req.query)
    // req.body - me sirve para capturar los valores del input en el formulario
    // req.query - me sirve para capturar los valores que paso como parámetros

    // PROBAMOS - Para ver si funciona enviamos un mensaje que nos muestre que funciona la llamada req.query
    //res.status(200).json({ msg: 'probando testeando rutas DOS' });
    
    // Una vez que hicimos la prueba y que todo está ok, podemos traer los productos de la siguiente forma: http://localhost:4600/pepe?featured=true    
    // res.status(200).json({products});

    // (hago referencia a products.ejs)=> {products : products} <=(hago referencia a la variable products)
    res.render('products', {products:products})
};


module.exports = {
    getAllProduct,
    getAllProductStatics,
    getAllLiddy,
    getAllIkea
}


