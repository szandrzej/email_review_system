import React, { Component } from 'react'
import { Progress, Row, Col } from 'reactstrap'
import moment from 'moment'

class Review extends Component {
  render () {
    const { review } = this.props
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
              </Row>
            </Col>
            <Col sm={ 3 }>
              <Progress color={review.score > 50 ? 'success' : 'danger'} value={review.score} />
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
