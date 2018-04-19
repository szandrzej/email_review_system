const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { Review } = require('../commons/schema')(mongoose)
const logger = require('../commons/utils/logger')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const credentials = {
  url: process.env.WATSON_URL,
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD
}

const toneAnalyzer = new ToneAnalyzerV3({
  ...credentials,
  version: '2016-05-19',
})

const nlu = new NaturalLanguageUnderstandingV1({
  ...credentials,
  version: '2018-04-05'
})

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

async function updateReview (req, res) {
  try {
    const result = await callWatsonForAnalysis(req.body.text)
    const review = await Review.findOneAndUpdate(
      { _id: ObjectId(req.params.reviewId) },
      {
        ...result,
        text: req.body.text
      },
      { new: true })
    if (review) {
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

async function publishReview (req, res) {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: ObjectId(req.params.reviewId) },
      { published: req.body.publish },
      { new: true })
    if (review) {
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
    nlu.analyze(
      {
        text,
        features: {
          sentiment: {}
        }
      },
      function (err, tone) {
        const score = err ? 50 : (tone.sentiment.document.score * 100 + 100) / 2
        resolve({
          score: score,
          category: score > 50 ? 'likely positive' : 'maybe negative'
        })
      }
    )
  })
}

module.exports = {
  pushNewReview,
  updateReview,
  publishReview
}
