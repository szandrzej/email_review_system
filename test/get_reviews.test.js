const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

const { mongo } = require('../config')
const mongoose = require('mongoose')
mongoose.connect(mongo.connectionUrl, {})
  .then()
  .catch(console.log)

const { ObjectId } = mongoose.Types
const { Review } = require('../commons/schema')(mongoose)
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

const reviewId = ObjectId()

describe('GET /reviews', () => {

  before( async () => {
    await Review.remove({})
    await Review.create({
      _id: reviewId,
      text: 'Example review #1',
      email: 'test@test.com',
      created_at: Date.now(),
      score: 12,
      category: 'maybe negative',
      published: false
    })
    await Review.create({
      _id: ObjectId(),
      text: 'Example review #2',
      email: 'test2@test.com',
      created_at: Date.now(),
      score: 89,
      category: 'likely positive',
      published: true
    })
  })

  it('returns 200', (done) => {
    chai.request(server)
      .get('/api/reviews')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('returns 400', (done) => {
    chai.request(server)
      .get('/api/reviews?published=aaa')
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('without query params returns array with two objects', (done) => {
    chai.request(server)
      .get('/api/reviews')
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(2)
        done()
      })
  })

  it('with published=true returns array with one object', (done) => {
    chai.request(server)
      .get('/api/reviews?published=true')
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(1)
        expect(res.body[0].published).to.equal(true)
        done()
      })
  })
})
