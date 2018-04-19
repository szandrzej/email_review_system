const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { Review } = require('../commons/schema')(mongoose)
const logger = require('../commons/utils/logger')

function retrieveReviews (req, res) {
  const conditions = {}
  if(req.query.published !== undefined) {
    Object.assign(conditions, {
      published: req.query.published
    })
  }

  Review.find(conditions)
    .then(reviews => {
      res.status(HttpStatus.OK).send(reviews)
    })
    .catch(err => {
      console.log(err)
      logger.error(err)
      res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  retrieveReviews
}
