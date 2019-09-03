const mongoose = require('mongoose')

module.exports = (ref, { index = false, required = true, defaultValue = undefined } = {}) => ({
  type: mongoose.Schema.ObjectId,
  required,
  ref,
  defaultValue,
  index
})
