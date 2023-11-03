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
/* router.get('/search', async (req, res) => {
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
});  */



// Ruta para buscar productos por palabra clave y por precio
router.get('/search', async (req, res) => {
    const keyword = req.query.keyword; // Obtiene la palabra clave ingresada por el usuario desde la URL
    let minPrice = 0; // Precio mínimo por defecto
    let maxPrice = Number.POSITIVE_INFINITY; // Precio máximo por defecto

    // Verifica si se proporcionan rangos de precios
    if (req.query.minPrice) {
        minPrice = parseFloat(req.query.minPrice);
    }
    if (req.query.maxPrice) {
        maxPrice = parseFloat(req.query.maxPrice);
    }

    try {
        const products = await Product.find({
            $or: [                
                { name: { $regex: keyword, $options: 'i' } },
                { company: { $regex: keyword, $options: 'i' } },
            ],
            price: { $gte: minPrice, $lte: maxPrice } // Búsqueda por precio en un rango
        });
        res.render('products', { products });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
});


// Ruta para mostrar detalles de un producto por su _id
router.get('/:id', async (req, res) => {
    try {
      const productId = req.params.id; // Obtiene el ID del producto desde los parámetros de la URL
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }
      res.render('productDetails', { product });
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor.' });
    }
});







module.exports = router

