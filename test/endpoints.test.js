const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Web server', () => {
  it('GET /reviews returns 200', (done) => {
    chai.request(server)
      .get('/api/reviews')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('POST /reviews returns 201', (done) => {
    chai.request(server)
      .post('/api/reviews')
      .body({
        text: 'Lorem ipsum',
        email: 'test@test.com'
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
