const HttpStatus = require('http-status-codes')

function pushNewReview (req, res) {

  res.status(HttpStatus.CREATED).send({
    id: '2342-123adasda-1231312-sdasda',
    email: req.body.email,
    text: req.body.text,
    created_at: new Date(),
    score: 20,
    category: 'likely positive',
    published: false
  })
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

function publishReview (req, res) {
  res.status(HttpStatus.OK).send({
    id: req.params.reviewId,
    email: 'email@test.com',
    text: 'lorem ipsum lorem ipsum',
    created_at: new Date(),
    score: 20,
    category: 'likely positive',
    published: req.body.publish
  })
}

module.exports = {
  pushNewReview,
  updateReview,
  publishReview
}
