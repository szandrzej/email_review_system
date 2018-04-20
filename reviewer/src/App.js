import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/reviews',
})

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      text: '',
      currentId: null
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
      let response
      response = currentId
        ? await API.put(`/${currentId}`, { text })
        : await API.post('/', { email, text })
      this.setState({
        currentId: response.data._id
      })
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const { email, text, currentId } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Container>
          <Row>
            <Form className="full-width space-above">
              <Col md={ { size: 6, offset: 3 } }>
                <h1>Put your review!</h1>
                <FormGroup>
                  <Input type="email" name="email" id="email" onChange={ this.changeEmail } value={ this.state.email }
                         placeholder="Sender email"/>
                </FormGroup>
                <FormGroup>
                  <Input type="textarea" name="text" id="text" placeholder="Review content" onChange={ this.changeText } value={ this.state.text }/>
                </FormGroup>
                <Button color="primary" block disabled={ !(email && text) }
                        onClick={ this.handleClick }>{ currentId ? 'Update' : 'Submit' }</Button>
                <Button color="link" block onClick={this.handleClear}>Clear</Button>
              </Col>
            </Form>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
