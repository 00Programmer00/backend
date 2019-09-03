const emailValidator = require('email-validator').validate
const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true
  },
  lastName: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    validate: { validator: emailValidator },
    unique: true,
    uniqueCaseInsensitive: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  apiKey: {
    type: String,
    required: true,
    default: uuid.v4
  }
}, { minimize: false })

userSchema.plugin(mongooseUniqueValidator, { message: 'This {PATH} is already registered to an account' })

userSchema.path('firstName').validate(name => name.length <= 255, 'MaxLength error', 255)

const User = mongoose.model('User', userSchema)

module.exports = User
