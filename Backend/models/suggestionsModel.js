const mongoose = require('mongoose')

const suggestionsSchema = mongoose.Schema(
  {
    ulam: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    food: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    salon: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    attraction: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    clouth: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    photographer: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    placeDesign: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    mohel: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
    activeBar: {
      type: Array,
      required: [true, 'Please add a text value'],
    },
  },
)

module.exports = mongoose.model('suggestions', suggestionsSchema)
