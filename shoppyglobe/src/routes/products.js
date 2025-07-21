const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /products
router.get('/', async (req, res) => { // Handle GET request to fetch the entire list of products
  const list = await Product.find();
  res.json(list);
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id); // Use Mongoose to find a product by its MongoDB ObjectId (provided in the URL)
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

module.exports = router;
