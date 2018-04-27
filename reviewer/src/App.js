import React, { Component } from 'react'
import './App.css'
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios'
import Review from './Review'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/reviews',
})

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      text: '',
      currentId: null,
      reviews: []
    }
  }

  async componentDidMount  () {
    try {
      const reviews = await API.get('?published=true')
      this.setState({
        reviews: reviews.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  changeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  changeText = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleClear = () => {
    this.setState({
      email: '',
      text: '',
      currentId: null
    })
  }

  handleClick = async () => {
    const { email, text, currentId } = this.state
    try {
      const response = currentId
        ? await API.put(`/${currentId}`, { text })
        : await API.post('/', { email, text })
      this.setState({
        currentId: response.data._id,
        error: null
      })
    } catch (err) {
      this.setState({
        error: 'Sending review failed'
      })
      console.log(err)
    }
  }

  render () {
    const { email, text, currentId, reviews, error } = this.state
    return (
      <div className="App">
        <Container>
          <Row>
              <Col md={6} >
                <Form className="full-width space-above">
                <h1>Put your review!</h1>
                <FormGroup>
                  <Input type="email" name="email" id="email" onChange={ this.changeEmail } value={ this.state.email }
                         placeholder="Sender email"/>
                </FormGroup>
                <FormGroup>
                  <Input type="textarea" name="text" id="text" placeholder="Review content" onChange={ this.changeText } value={ this.state.text }/>
                </FormGroup>
                  { error &&
                    <p className="error-text">{ error }</p>
                  }
                <Button color="primary" block disabled={ !(email && text) }
                        onClick={ this.handleClick }>{ currentId ? 'Update' : 'Submit' }</Button>
                <Button color="link" block onClick={this.handleClear}>Clear</Button>
                </Form>
              </Col>
            <Col md={6} className="space-above">
              <h1>Published reviews</h1>
              {
                reviews.map(r =>
                  <Review review={r} key={r._id}/>
                )
              }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
