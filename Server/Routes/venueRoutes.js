const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()
const {registerVenueController, getAllVenues, getVenueInfoById, getFeaturedVenues, getVenueRating} = require('../Controllers/VenueController')

// register
router.get('/featured-venues',getFeaturedVenues)
router.post('/register',authMiddleware,registerVenueController)
router.get('/',authMiddleware,getAllVenues)
router.get('/:id',authMiddleware,getVenueInfoById)
router.get('/rating/:id',authMiddleware,getVenueRating)

module.exports = router