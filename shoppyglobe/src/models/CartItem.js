const mongoose = require('mongoose'); // Import the mongoose library to define schemas and interact with MongoDB

const cartItemSchema = new mongoose.Schema({ // Define a new Mongoose schema for cart items
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },// Reference to the user who added this item to their cart
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('CartItem', cartItemSchema);
