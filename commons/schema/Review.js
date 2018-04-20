const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({

  email: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [ 'likely.positive', 'maybe.negative' ],
    required: true
  },
  published: {
    type: Boolean,
    default: false
  },
  created_at: { type: Date, default: Date.now }
})


module.exports = ReviewSchema
