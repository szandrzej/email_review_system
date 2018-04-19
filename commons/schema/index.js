const ReviewSchema = require('./Review')

module.exports = (mongoose) => {
  return {
    Review: mongoose.model('Review', ReviewSchema)
  }
}
