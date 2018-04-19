const HttpStatus = require('http-status-codes')

function retrieveReviews (req, res) {
  res.status(HttpStatus.OK).send([
    {
      id: '2342-123adasda-1231312-sdasda',
      email: req.body.email,
      text: req.body.text,
      created_at: new Date(),
      score: 20,
      category: 'likely positive',
      published: false
    }
  ])
}

module.exports = {
  retrieveReviews
}
