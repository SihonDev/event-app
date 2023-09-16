const asyncHandler = require('express-async-handler')

const Suppliers = require('../models/suppliersModel')

const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Suppliers.find({ user: req.user.id })

  res.status(200).json(suppliers)
})

module.exports = {
  getSuppliers,
}
