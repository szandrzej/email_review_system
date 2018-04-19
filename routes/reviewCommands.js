const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { Review } = require('../commons/schema')(mongoose)
const logger = require('../commons/utils/logger')

async function pushNewReview (req, res) {
  try {
    const result = await callWatsonForAnalysis(req.body.text)
    const review = await Review.create(Object.assign(req.body, result))
    res.status(HttpStatus.CREATED).send(review)
  } catch (err) {
    console.log(err)
    logger.error(err)
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

function updateReview (req, res) {
  res.status(HttpStatus.OK).send({
    id: req.params.reviewId,
    email: 'email@test.com',
    text: req.body.text,
    created_at: new Date(),
    score: 20,
    category: 'likely positive',
    published: false
  })
}

async function publishReview (req, res) {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: ObjectId(req.params.reviewId) },
      { published: req.body.publish },
      { new: true })
    if(review) {
      res.status(HttpStatus.OK).send(review)
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND)
    }
  } catch (err) {
    console.log(err)
    logger.error(err)
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

function callWatsonForAnalysis (text) {
  return new Promise(resolve => {
    resolve({
      score: 77,
      category: 'likely positive'
    })
  })
}

module.exports = {
  pushNewReview,
  updateReview,
  publishReview
}
