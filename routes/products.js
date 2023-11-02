/* Las rutas son la parte del app.get */

const express = require('express')
const router = express.Router()
const Product = require('../models/Product');

const{
    getAllProduct,
    getAllProductStatics,
    getAllLiddy,
    getAllIkea
} = require('../controllers/products')


// localhost:4600/pepe
router.get('/', getAllProduct);

// localhost:4600/pepe/statico
router.get('/statico', getAllProductStatics)

//router.get('/all', getAllProductStatics)

// localhost:4600/pepe/liddy
router.get('/liddy', getAllLiddy)


// localhost:4600/pepe/ikea
router.get('/ikea', getAllIkea)




// Ruta para buscar productos por palabra clave
router.get('/search', async (req, res) => {
    const keyword = req.query.keyword; // Obtiene la palabra clave ingresada por el usuario desde la URL
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } }, // Búsqueda por nombre
                { company: { $regex: keyword, $options: 'i' } }, // Búsqueda por compañía
                { price: parseFloat(keyword) || 0 }, // Búsqueda por precio
            ]
        });
        res.render('products', { products });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
});


module.exports = router

