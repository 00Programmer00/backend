const mongoose = require('mongoose')
const uuid = require('uuid')
const createdBy = require('../schema/createdBy')

const walkSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    index: true
  },
  coordinates: {
    type: Array,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    default: uuid.v4
  },
  createdBy: createdBy()
}, { minimize: false })

walkSchema.path('type').validate(name => name.length <= 255, 'MaxLength error', 255)
walkSchema.path('title').validate(name => name.length <= 255, 'MaxLength error', 255)

const Walk = mongoose.model('Walk', walkSchema)

module.exports = Walk
