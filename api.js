const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query
  res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }))
}

async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  if (!product) return next()
  res.json(product)
}

async function createProduct(req, res) {
  res.json(await Products.create(req.body))
}

async function editProduct(req, res) {
  res.json(await Products.edit(req.params.id, req.body))
}

async function deleteProduct(req, res) {
  await Products.destroy(req.params.id)
  res.json({ success: true })
}

async function listOrders(req, res) {
  const { offset = 0, limit = 25 } = req.query
  res.json(await Orders.list({ offset: Number(offset), limit: Number(limit) }))
}

async function createOrder(req, res) {
  res.json(await Orders.create(req.body))
}

async function editOrder(req, res) {
  res.json(await Orders.edit(req.params.id, req.body))
}

async function deleteOrder(req, res) {
  await Orders.destroy(req.params.id)
  res.json({ success: true })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder,
})
