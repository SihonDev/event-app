const asyncHandler = require('express-async-handler')

const EventsType = require('../models/eventsTypeModel')

const getEventsType = asyncHandler(async (req, res) => {
  const eventsType = await EventsType.find({ user: req.user.id })

  res.status(200).json(eventsType)
})

module.exports = {
  getEventsType,
}
