const express = require('express');
const CartItem = require('../models/CartItem'); // Import the CartItem model to interact with cart items in the database
const auth = require('../middleware/auth'); // Import authentication middleware to protect cart routes
const router = express.Router().use(auth); // Create a new Express router and apply the auth middleware to all its routes

// GET /cart
router.get('/', async (req, res) => {
  const items = await CartItem.find({ user: req.userId }).populate('product'); // Find all cart items for the current user and populate the associated product details
  res.json(items);
});

// POST /cart
router.post('/', async (req, res) => { // Handle POST request to add a new item or update quantity if it already exists
  const { productId, quantity } = req.body; // Extract productId and quantity from the request body
  if (!productId || quantity < 1)   // Validate input: productId must exist and quantity must be at least 1
    return res.status(400).json({ error: 'Invalid input' }); 

  let item = await CartItem.findOne({ user: req.userId, product: productId });  // Check if the item already exists in the user's cart
  if (item) {  // If it exists, update the quantity
    item.quantity += quantity; // Add the new quantity to the existing one
    await item.save(); // Save changes to the database
  } else {
    item = await CartItem.create({ user: req.userId, product: productId, quantity }); // If it doesn't exist, create a new cart item
  }
  res.status(201).json(item);
});

// PUT /cart
router.put('/', async (req, res) => { // Handle PUT request to update the quantity of a specific cart item
  const { productId, quantity } = req.body;  // Extract productId and quantity from the request body
  const item = await CartItem.findOne({ user: req.userId, product: productId });  // Find the cart item that matches the user and product
  if (!item) return res.status(404).json({ error: 'Not in cart' }); // If the item doesn't exist in the cart, return 404 Not Found
  item.quantity = quantity; // Update the quantity with the new value
  await item.save();   // Save the updated item
  res.json(item);   // Return the updated cart item
});

// DELETE /cart
router.delete('/', async (req, res) => { // Handle DELETE request to remove a cart item based on productId
  const { productId } = req.body; // Extract productId from the request body
  await CartItem.findOneAndDelete({ user: req.userId, product: productId });  // Find and delete the cart item for the current user and product
  res.status(204).end();  // Return HTTP 204 No Content to indicate successful deletion
});

module.exports = router;
