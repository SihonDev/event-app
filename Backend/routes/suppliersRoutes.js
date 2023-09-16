const express = require('express')
const router = express.Router()
const { getSuppliers } = require('../controllers/suppliersController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSuppliers).post(protect)
// router.route('/:id').delete(protect, deleteInvoice).put(protect, updateInvoice)

module.exports = router
