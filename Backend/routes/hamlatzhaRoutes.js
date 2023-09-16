const express = require('express')
const router = express.Router()
const {
  getHamlatzot,
  setHamlatzha,
  deleteHamlatzha,
} = require('../controllers/hamlatzhaController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getHamlatzot).post(protect, setHamlatzha)
router.route('/:id').delete(protect, deleteHamlatzha)

module.exports = router
