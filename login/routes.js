const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const loginValidator = require('./validator')
const validate = require('../util/validate-middleware')
const Bcrypt = require('bcryptjs')

const User = mongoose.model('User')

// function authenticate(email, pass, fn) {
//   User.findOne ({email}, (err, user) => {
//     if (!user) return fn(new Error('cannot find user'));
//     pwd.hash(pass, user.salt, (err, hash) => {
//       if (err) return fn(err);
//       if (hash === user.hash) return fn(null, user);
//       fn(new Error('invalid password'));
//     })
//   })
// }

router.post('/', validate(loginValidator.login),
  async (req, res, next) => {
    try {
      console.log('Login')
      let user = await User.findOne({email: req.body.user.email})
      if(!user) {
        return res.status(400).send({ message: 'The user does not exist' })
      }
      if (!Bcrypt.compareSync(req.body.user.password, user.password)) {
        return res.status(401).send({ message: 'The password is invalid' })
      }
      res.status(200).send({
        message: 'The username and password combination is correct!',
        user
      })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
