const mongoose = require('mongoose')
const LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy
const passport = require('passport')

passport.use('api-key', new LocalAPIKeyStrategy({ apiKeyHeader: 'x-api-key' }, (apiKey, cb) => {
  const User = mongoose.model('User')
  User.findOne({ apiKey })
    .then(user => {
      cb(null, user)
    })
    .catch(cb)
}))

function makeMiddleware (strategies) {
  let middlewareOptions = {
    client: passport.authenticate(strategies, { session: false })
  }
  return (req, res, next) => {
    let middleware = middlewareOptions.client
    return middleware(req, res, next)
  }
}

module.exports = makeMiddleware(['api-key'])
