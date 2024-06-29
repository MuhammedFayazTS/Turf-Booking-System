const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAdminInfo, updateReqStatus, fetchAllBookings, fetchAllUsers, removeUserById, removeVenueById, removeBookingById, editUserById, editVenueById } = require('../Controllers/adminController')
const adminMiddleware = require('../middlewares/isAdminMiddleware')
const router = express.Router()


// -------------------------------Admin routes --------------------------------

// update request status
router.put('/update-request-status',authMiddleware,adminMiddleware,updateReqStatus)

// get admin info
router.get('/getadmin',authMiddleware,adminMiddleware,getAdminInfo)

// get all bookings  of the site
router.get('/all-bookings',authMiddleware,adminMiddleware,fetchAllBookings)

// get all bookings  of the site
router.get('/all-users',authMiddleware,adminMiddleware,fetchAllUsers)

// remove user from db using id
router.delete('/user/:id',authMiddleware,adminMiddleware,removeUserById)

// remove venue from db using id
router.delete('/venue/:id',authMiddleware,adminMiddleware,removeVenueById)

// remove booking from db using id
router.delete('/booking/:id',authMiddleware,adminMiddleware,removeBookingById)

// ----------------------------------- EDIT -----------------------------------------

// edit user  using id
router.put('/user/:id',authMiddleware,adminMiddleware,editUserById)

// edit Venue using id
router.put('/venue/:id',authMiddleware,adminMiddleware,editVenueById)


module.exports = router
