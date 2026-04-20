const mongoose = require('mongoose')

const Order = mongoose.model('Order', new mongoose.Schema({
  buyerEmail: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  status: { type: String, default: 'CREATED', enum: ['CREATED', 'PENDING', 'COMPLETED'] },
}, { timestamps: true }))

async function list(options = {}) {
  const { offset = 0, limit = 25 } = options
  return Order.find().skip(Number(offset)).limit(Number(limit)).populate('products')
}

async function get(id) {
  return Order.findById(id).populate('products')
}

async function create(fields) {
  return new Order(fields).save().then(order => order.populate('products'))
}

async function edit(id, fields) {
  return Order.findByIdAndUpdate(id, fields, { new: true })
}

async function destroy(id) {
  return Order.findByIdAndDelete(id)
}

module.exports = { list, get, create, edit, destroy }
