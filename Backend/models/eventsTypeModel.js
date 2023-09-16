const mongoose = require('mongoose')

const eventsTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    image: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    description: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    link: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
)

module.exports = mongoose.model('EventType', eventsTypeSchema)
