const mongoose = require('mongoose')
// mongoose.set('debug', true)
const eventEmitter = require('./event-emitter')
const config = require('../config/index')
// require models first to avoid 'Uninitialized model' errors in mongoose

require('../users/model.js')
require('../walks/model.js')

module.exports.connect = () => new Promise((resolve, reject) => {
  // https://mongoosejs.com/docs/deprecations.html
  mongoose.connect(config.mongo.url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, function (err) {
    if (err) {
      return reject(err)
    }
    eventEmitter.emit('mongo-ready')
    resolve(mongoose)
  })
})
