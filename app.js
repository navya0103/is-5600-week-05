const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Product = require('./models/Product');
mongoose.connect('YOUR_CONNECTION_STRING')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory
const Product = require('./models/Product');


// CREATE
app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    const saved = await product.save();
    res.json(saved);
});


// READ
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});


// UPDATE
app.put('/products/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});


// DELETE
app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});
app.use(express.static(__dirname + '/public'));
// register the routes
app.use(bodyParser.json())
app.use(middleware.cors)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

