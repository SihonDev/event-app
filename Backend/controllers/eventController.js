const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')
const User = require('../models/userModel')


const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id })

  res.status(200).json(events)
})


const setEvent = asyncHandler(async (req, res) => {
  
  if (!req.body) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  if(!req.body.id){
    console.log('create')
  const event = await Event.create({
    foodValue: req.body.foodValue,
    ulamValue: req.body.ulamValue,
    attractionValue: req.body.attractionValue,
    clouthValue: req.body.clouthValue,
    photographerValue: req.body.photographerValue,
    salonValue: req.body.salonValue,
    placeDesignValue: req.body.placeDesignValue,
    mohelValue: req.body.mohelValue,
    activeBarValue: req.body.activeBarValue,
    dateValue: req.body.dateValue,
    nameValue: req.body.nameValue,
    eventValue: req.body.eventValue,
    user: req.user.id,
  })
  res.status(200).json(event)
} else {
    console.log('req.body.id- update', req.body.id)
    const event = await Event.findById( req.body.id)
    if (!event) {
      res.status(400)
      throw new Error('event not found')
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedEvent)
  }

  
})


const updateEvent = asyncHandler(async (req, res) => {
  console.log('first')
  const event = await Event.findById(req.params.id)
  if (!event) {
    res.status(400)
    throw new Error('event not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }


  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedEvent)
})


const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(400)
    throw new Error('event not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }


  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await event.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
}
