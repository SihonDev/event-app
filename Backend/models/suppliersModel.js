const mongoose = require('mongoose')

const suppliersSchema = mongoose.Schema(
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

module.exports = mongoose.model('suppliers', suppliersSchema)
