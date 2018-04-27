const HttpStatus = require('http-status-codes')

const mongoose = require('mongoose')
const { Review } = require('../commons/schema')(mongoose)

async function retrieveReviews (req, res) {
  const conditions = {}
  if (req.query.published !== undefined) {
    Object.assign(conditions, {
      published: req.query.published
    })
  }
  const reviews = await Review.find(conditions)
  res.status(HttpStatus.OK).send(reviews)
}

module.exports = {
  retrieveReviews
}
