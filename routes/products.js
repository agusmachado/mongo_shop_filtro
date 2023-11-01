/* Las rutas son la parte del app.get */

const express = require('express')
const router = express.Router()

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

module.exports = router

