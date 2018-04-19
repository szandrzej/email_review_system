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

describe('POST /reviews', () => {

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
  })

  it('POST /reviews returns 201', (done) => {
    chai.request(server)
      .post('/api/reviews')
      .send({
        text: 'Lorem ipsum',
        email: 'test@test.com'
      })
      .end((err, res) => {
        res.should.have.status(201)
        done()
      })
  })

  it('POST /reviews without text in body returns 400', (done) => {
    chai.request(server)
      .post('/api/reviews')
      .send({
        text2: 'Lorem ipsum',
        email: 'test@test.com'
      })
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('POST /reviews without email in body returns 400', (done) => {
    chai.request(server)
      .post('/api/reviews')
      .send({
        text: 'Lorem ipsum',
        email1: 'test@test.com'
      })
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('POST /reviews with incorrect email in body returns 400', (done) => {
    chai.request(server)
      .post('/api/reviews')
      .send({
        text: 'Lorem ipsum',
        email1: 'testtest.com'
      })
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('POST /reviews returns created object', (done) => {
    chai.request(server)
      .post('/api/reviews')
      .send({
        text: 'Lorem ipsum',
        email: 'test@test.com'
      })
      .end((err, res) => {
        expect(res.body).to.have.all.keys('_id', 'score', 'text','created_at', 'category','email', 'published', '__v')
        done()
      })
  })
})
