const ajv = require('ajv')()
const cloneDeep = require('lodash/cloneDeep')

let userSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        email: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          maxLength: 50,
          minLength: 6
        }
      },
      required: ['firstName', 'lastName', 'email', 'password'],
      additionalProperties: false
    }
  },
  required: ['user'],
  additionalProperties: false
}

let validatePost = ajv.compile(userSchema)

let updateUserSchema = cloneDeep(userSchema)
let validatePut = ajv.compile(updateUserSchema)

let checkUniqueSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        email: {
          type: 'string'
        }
      },
      additionalProperties: false
    }
  },
  required: ['user'],
  additionalProperties: false
}

let validateCheckUnique = ajv.compile(checkUniqueSchema)

module.exports.create = validatePost
module.exports.update = validatePut
module.exports.checkUnique = validateCheckUnique
