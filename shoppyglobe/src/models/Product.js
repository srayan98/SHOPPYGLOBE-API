const mongoose = require('mongoose');

// Define a new Mongoose schema for products
const productSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);
