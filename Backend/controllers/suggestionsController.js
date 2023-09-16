const asyncHandler = require('express-async-handler')

const Suggestions = require('../models/suggestionsModel')

const getSuggestions = asyncHandler(async (req, res) => {
  const suggestions = await Suggestions.find({ user: req.user.id })

  res.status(200).json(suggestions)
})

module.exports = {
  getSuggestions,
}
