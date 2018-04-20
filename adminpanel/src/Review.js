import React, { Component } from 'react'
import { Progress, Row, Col, Button } from 'reactstrap'
import moment from 'moment'

class Review extends Component {
  render () {
    const { review, onPublishClick } = this.props
    return (
      <div className="review">
        <div className="review-header">
          <Row>
            <Col sm={ 9 }>
              <Row>
                <Col>
                  <p className="header-email">
                    { review.email }
                  </p>
                  <p className="header-date">{ moment(review.created_at).format('MMMM Do YYYY, h:mm:ss a') }</p>
                </Col>
                <Col>
                  <Progress color={review.score > 50 ? 'success' : 'danger'} value={review.score} />
                </Col>
              </Row>
            </Col>
            <Col sm={ 3 }>
              {
                review.published
                  ? <Button color='secondary' block onClick={() => onPublishClick(false)}>Unpublished</Button>
                  : <Button color='success' block onClick={() => onPublishClick(true)}>Publish</Button>
              }
            </Col>
          </Row>
        </div>
        <div className="review-content">
          <p>{ review.text }</p>
        </div>
      </div>
    )
  }
}

export default Review
