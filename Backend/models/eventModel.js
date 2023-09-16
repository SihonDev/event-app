const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    ulamValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    foodValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    attractionValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    clouthValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    photographerValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    salonValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    activeBarValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    mohelValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    placeDesignValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },   
    dateValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },  
    nameValue: {
      type: String,
      required: [false, 'Please add a text value'],
    },  
    eventValue: {
      type: String,
      required: [false, 'Please add a text value'],
    }, 
  },
)

module.exports = mongoose.model('Event', eventSchema)
