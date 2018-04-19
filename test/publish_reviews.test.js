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

describe('PATCH /reviews/reviewID', () => {

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

  it('PATCH /reviews returns 200', (done) => {
    chai.request(server)
      .patch(`/api/reviews/${reviewId}`)
      .send({
        publish: true
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('PATCH /reviews without publish field returns 400', (done) => {
    chai.request(server)
      .patch(`/api/reviews/${reviewId}`)
      .send({
      })
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('PATCH /reviews with publish not boolean returns 400', (done) => {
    chai.request(server)
      .patch(`/api/reviews/${reviewId}`)
      .send({
        publish: 'aaa222'
      })
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('PATCH /reviews update not existing review returns 404', (done) => {
    chai.request(server)
      .patch(`/api/reviews/123-qweqweqw`)
      .send({
        publish: true
      })
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })

  it('PATCH /reviews returns updated object', (done) => {
    chai.request(server)
      .patch(`/api/reviews/${reviewId}`)
      .send({
        publish: true
      })
      .end((err, res) => {
        expect(res.body).to.have.all.keys('_id', 'score', 'text','created_at', 'category','email', 'published', '__v')
        done()
      })
  })
})
