const express = require('express')
const router = express.Router()
const { query, body, validationResult } = require('express-validator/check')
const { retrieveReviews } = require('./reviewQueries')
const { publishReview, pushNewReview, updateReview } = require('./reviewCommands')
const HttpStatus = require('http-status-codes')

const rulesForCreateReview = [
  body('text').exists().not().isEmpty(),
  body('email').exists().isEmail().not().isEmpty()
]

const rulesForUpdateReview = [
  body('text').exists().not().isEmpty()
]

const rulesForPublishReview = [
  body('publish').exists().isBoolean()
]

const rulesForRetrieveReviews = [
  query('published').optional().isBoolean()
]

router.get('/reviews', [rulesForRetrieveReviews, checkErrors ], retrieveReviews)

router.post('/reviews', [ rulesForCreateReview, checkErrors ], pushNewReview)
router.put('/reviews/:reviewId', [ rulesForUpdateReview, checkErrors ], updateReview)
router.patch('/reviews/:reviewId', [ rulesForPublishReview, checkErrors ], publishReview)

function checkErrors (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).send({ errors: errors.mapped() })
  }
  next()
}

module.exports = router
