const ajv = require('ajv')()
const cloneDeep = require('lodash/cloneDeep')

let walkSchema = {
  type: 'object',
  properties: {
    walk: {
      type: 'object',
      properties: {
        title: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        coordinates: {
          type: 'array'
        }
      },
      required: ['title', 'type', 'coordinates'],
      additionalProperties: false
    }
  },
  required: ['walk'],
  additionalProperties: false
}

let validatePost = ajv.compile(walkSchema)

module.exports.create = validatePost
