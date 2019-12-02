const express = require('express')
const passport = require('passport')
const Entry = require('../models/entry')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX, GET /entries
router.get('/entries', requireToken, (req, res, next) => {
  Entry.find({ owner: req.user._id })
    .then(entries => {
      return entries.map(entry => entry.toObject())
    })
    .then(entries => res.status(200).json({ entries: entries }))
    .catch(next)
})

// SHOW, GET one entries/:id
router.get('/entries/:id', requireToken, (req, res, next) => {
  Entry.findById(req.params.id)
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
