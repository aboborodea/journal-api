// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for items
const Entry = require('../models/entry')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { item: { title: '', text: 'foo' } } -> { item: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX, GET /entries
router.get('/entries', requireToken, (req, res, next) => {
  Entry.find()
    .then(entries => {
      return entries.map(entry => entry.toObject())
    })
    .then(entries => res.status(200).json({ entries: entries }))
    .catch(next)
})

// SHOW, GET one entries/:id
router.get('/entries/:id', requireToken, (req, res, next) => {
  let search = { owner: req.user._id }
  Entry.findById(search)
    .then(handle404)
    .then(entry => {
      requireOwnership(req, entry)
      return res.status(200).json({ entry: entry.toObject() })
    })
    .catch(next)
})

// CREATE, POST /entries
router.post('/entries', requireToken, (req, res, next) => {
  req.body.entry.owner = req.user.id
  Entry.create(req.body.entry)
    .then(entry => {
      res.status(201).json({ entry: entry.toObject() })
    })
    .catch(next)
})

// UPDATE, PATCH /entries/:id
router.patch('/entries/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.entry.owner
  Entry.findById(req.params.id)
    .then(handle404)
    .then(entry => {
      requireOwnership(req, entry)
      return entry.updateOne(req.body.entry)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY, DELETE /entries/:id
router.delete('/entries/:id', requireToken, (req, res, next) => {
  Entry.findById(req.params.id)
    .then(handle404)
    .then(entry => {
      requireOwnership(req, entry)
      entry.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
