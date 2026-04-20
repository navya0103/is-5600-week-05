const mongoose = require('mongoose')

const Product = mongoose.model('Product', new mongoose.Schema({
  description: String,
  alt_description: String,
  urls: {
    raw: String,
    full: String,
    regular: String,
    small: String,
    thumb: String,
  },
  links: {
    self: String,
    html: String,
    download: String,
    download_location: String,
  },
  user: {
    id: String,
    updated_at: String,
    username: String,
    name: String,
    portfolio_url: String,
    bio: String,
    location: String,
    links: {
      self: String,
      html: String,
      photos: String,
      likes: String,
      portfolio: String,
    },
    profile_image: {
      small: String,
      medium: String,
      large: String,
    },
    instagram_username: String,
    total_collections: Number,
    total_likes: Number,
    total_photos: Number,
  },
  tags: [{ title: String }],
  photo_tags: [{ title: String }],
}))

async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options
  const query = tag ? { tags: { $elemMatch: { title: tag } } } : {}
  return Product.find(query).skip(Number(offset)).limit(Number(limit))
}

async function get(id) {
  return Product.findById(id)
}

async function create(fields) {
  return new Product(fields).save()
}

async function edit(id, fields) {
  return Product.findByIdAndUpdate(id, fields, { new: true })
}

async function destroy(id) {
  return Product.findByIdAndDelete(id)
}

module.exports = { list, get, create, edit, destroy }
