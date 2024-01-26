const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAdminInfo, updateReqStatus, fetchAllBookings, fetchAllUsers } = require('../Controllers/adminController')
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



module.exports = router
