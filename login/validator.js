const ajv = require('ajv')()
const cloneDeep = require('lodash/cloneDeep')

let userSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
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
      required: ['email', 'password'],
      additionalProperties: false
    }
  },
  required: ['user'],
  additionalProperties: false
}

let validateLogin = ajv.compile(userSchema)

module.exports.login = validateLogin
