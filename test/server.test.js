const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Web server', () => {
  it('GET /api returns 404', (done) => {
    // chai.request(server)
    //   .get('/api')
    //   .end((err, res) => {
    //     res.should.have.status(404)
    //     done()
    //   })
  })
})
