const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator/check')
const HttpStatus = require('http-status-codes')

function checkErrors (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).send({ errors: errors.mapped() })
  }
  next()
}

module.exports = router
