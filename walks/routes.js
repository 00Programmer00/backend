const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const walkValidator = require('./validator')
const validate = require('../util/validate-middleware')
const authenticate = require('../users/authenticate-middleware')

const Walk = mongoose.model('Walk')

/* GET walks listing. */
router.get('/', authenticate, async (req, res, next) => {
  let query = {}
  let page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 10
  console.log(req.query.filter)
  let filter = req.query.filter
  if (filter !== '{}') {
    console.log('sss')
    query = Object.assign(query, {createdBy: req.query.filter})
  }
  console.log(query)
  let [walks, count] = [
    await Walk.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('createdBy', ['email', 'firstName', 'lastName'])
      .lean({ virtuals: true }),
    await Walk.countDocuments({})
  ]
  res.set('X-Total-Count', count)
  res.set('X-Total-Pages', limit ? Math.ceil(count / limit) : 1)
  res.set('X-Current-Page', page || 1)
  console.log('Bye')
  res.json({walks})
})

router.post('/', authenticate, validate(walkValidator.create),
  async (req, res, next) => {
    try {
      if (!req.body.walk) {
        res.json({
          error: 'Invalid Form(walk object is missing)'
        })
        return
      }
      req.body.walk.createdBy = req.user._id
      let walk = new Walk(req.body.walk)
      walk = await walk.save()
      console.log('User', walk)
      res.json({
        walk
      })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
