import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Container, Button } from 'reactstrap'
import axios from 'axios'
import Review from './Review'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/reviews',
})

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      reviews: []
    }
  }

  async componentDidMount () {
    await this.handleUpdate()
  }

  handlePublishClick = async (publish, reviewId) => {
    try {
      await API.patch(`/${reviewId}`, { publish })
      const { reviews } = this.state
      const index = reviews.findIndex(r => r._id === reviewId)
      reviews[ index ].published = publish

      this.setState({
        reviews
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleUpdate = async () => {
    try {
      const reviews = await API.get('/')
      this.setState({
        reviews: reviews.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const { reviews } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Container>
          <h1>Admin panel</h1>
          <Button color='secondary' className='block' onClick={this.handleUpdate}>Update</Button>
          {
            reviews.map(r =>
              <Review review={ r } key={ r._id }
                      onPublishClick={ (publish) => this.handlePublishClick(publish, r._id) }/>
            )
          }
        </Container>
      </div>
    )
  }
}

export default App
