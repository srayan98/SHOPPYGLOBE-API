require('./config/db');         // Connect to DB

const express = require('express');
const authRoutes = require('./routes/auth');
const prodRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());       // Parse JSON bodies

app.use('/auth', authRoutes);
app.use('/products', prodRoutes);
app.use('/cart', cartRoutes);

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
