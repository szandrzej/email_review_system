import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      text: '',
      currentReview: {}
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

  handleClick = async (event) => {
    const {email, text} = this.state
    try {
      const response = await axios.post('http://localhost:3000/api/reviews', { email, text })
      console.log(response)
      this.setState({
        currentReview: response.data
      })
    } catch(err) {
      console.log(err)
    }

  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Container>
          <Row>
            <Form className="full-width">
              <Col md={ 6 }>
                <FormGroup>
                  <Label className="text-left" for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="email" onChange={ this.changeEmail } value={ this.state.email }
                         placeholder="with a placeholder"/>
                </FormGroup>
                <FormGroup>
                  <Label className="text-left" for="exampleText">Review content</Label>
                  <Input type="textarea" name="text" id="text" onChange={ this.changeText } value={ this.state.text }/>
                </FormGroup>
                <Button color="primary" size="lg" block onClick={this.handleClick}>Submit</Button>
              </Col>
              <Col md={6}>
                <p>{ JSON.stringify(this.state) }</p>
              </Col>
            </Form>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
