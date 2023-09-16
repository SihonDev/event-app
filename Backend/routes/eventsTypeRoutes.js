const express = require('express')
const router = express.Router()
const { getEventsType } = require('../controllers/eventsTypeController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getEventsType).post(protect)
// router.route('/:id').delete(protect, deleteInvoice).put(protect, updateInvoice)

module.exports = router
