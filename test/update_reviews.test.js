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

describe('PUT /reviews/reviewID', () => {

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

  it('PUT /reviews returns 200', (done) => {
    chai.request(server)
      .put(`/api/reviews/${reviewId}`)
      .send({
        text: '123234234 23424  '
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('PUT /reviews without text field returns 400', (done) => {
    chai.request(server)
      .put(`/api/reviews/${reviewId}`)
      .send({
      })
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('PUT /reviews update not existing review returns 404', (done) => {
    chai.request(server)
      .put(`/api/reviews/123-qweqweqw`)
      .send({
        text: '1231adadasd'
      })
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })

  it('PUT /reviews returns updated object', (done) => {
    chai.request(server)
      .put(`/api/reviews/${reviewId}`)
      .send({
        text: '234234 asdasd fsfddfs'
      })
      .end((err, res) => {
        expect(res.body).to.have.all.keys('_id', 'score', 'text','created_at', 'category','email', 'published', '__v')
        done()
      })
  })
})
