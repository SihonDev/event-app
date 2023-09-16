const express = require('express')
const router = express.Router()
const { getSuggestions } = require('../controllers/suggestionsController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSuggestions).post(protect)
// router.route('/:id').delete(protect, deleteInvoice).put(protect, updateInvoice)

module.exports = router
