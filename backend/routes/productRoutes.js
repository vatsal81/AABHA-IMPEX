const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Public
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Protected (Admin)
router.post('/admin', auth, productController.createProduct);
router.put('/admin/:id', auth, productController.updateProduct);
router.delete('/admin/:id', auth, productController.deleteProduct);

module.exports = router;
