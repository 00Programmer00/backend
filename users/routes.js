const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const userValidator = require('./validator')
const validate = require('../util/validate-middleware')
const Bcrypt = require('bcryptjs')
const authenticate = require('./authenticate-middleware')

const User = mongoose.model('User')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let users = await User.find({})
  res.json({users})
  console.log('users', users)
})

router.put('/:userId', authenticate, async (req, res, next) => {
  console.log('Put', req.body.user)
  await User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body.user})
  let user = await User.findOne({_id: req.params.userId})
  res.json({user})
})

router.post('/', validate(userValidator.create),
  async (req, res, next) => {
    try {
      if (!req.body.user) {
        res.json({
          error: 'Invalid Form(user object is missing)'
        })
        return
      }
      if (req.body.user && req.body.user.hasOwnProperty('email')) {
        req.body.user.email = req.body.user.email.toLowerCase()
      }
      req.body.user.password = Bcrypt.hashSync(req.body.user.password, 10)
      let user = new User(req.body.user)
      user = await user.save()
      console.log('User', user)
      res.json({
        user
      })
    } catch (err) {
      next(err)
    }
  })

module.exports = router;
