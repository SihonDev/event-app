const asyncHandler = require('express-async-handler')

const Hamlatzha = require('../models/hamlatzhaModel')
const User = require('../models/userModel')

const getHamlatzot = asyncHandler(async (req, res) => {
  const hamlatzot = await Hamlatzha.find()
  res.status(200).json(hamlatzot)
})

const setHamlatzha = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.name) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const hamlatzha = await Hamlatzha.create({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id,
  })

  res.status(200).json(hamlatzha)
})

const deleteHamlatzha = asyncHandler(async (req, res) => {
  const hamlatzha = await Hamlatzha.findById(req.params.id)

  if (!hamlatzha) {
    res.status(400)
    throw new Error('Hamlatzha not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  
  if (hamlatzha.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await hamlatzha.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getHamlatzot,
  setHamlatzha,
  deleteHamlatzha,
}
