const makeRef = require('./make-ref')

module.exports = () => {
  return makeRef('User', { index: true })
}
