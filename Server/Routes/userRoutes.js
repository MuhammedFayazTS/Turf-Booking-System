const express = require('express')
const { registerController, loginController, getUserInfoById, getAdminInfo, markAllAsSeen, deleteAllNotifiications, updateReqStatus, bookAppoimentController, getAllUserBookings, getAllVenueBookings, getUserInfoByToken, checkoutController, ratingController } = require('../Controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()




// register
router.post('/register',registerController)

// login
router.post('/login',loginController)

// get userinfo by id
router.post('/get-user-info-by-id',authMiddleware,getUserInfoById)
// getUserInfoByToken
router.post('/get-user-info-by-token',authMiddleware,getUserInfoByToken)

// mark all notifications as seen
router.put('/mark-all-notifications-as-seen',authMiddleware,markAllAsSeen)
// delete all notifications 
router.put('/delete-all-notifications-from-seen',authMiddleware,deleteAllNotifiications)

// book a slot by user
router.put('/book-appoiment',authMiddleware,bookAppoimentController)

// get all user bookings
router.post('/get-all-bookings',authMiddleware,getAllUserBookings)
// get all venue bookings for owner
router.post('/get-booking-summary',authMiddleware,getAllVenueBookings)


// add rating
router.post('/rating',authMiddleware,ratingController)

// checkout section
router.post('/checkout-session',checkoutController)


module.exports = router
