const mongoose = require("mongoose");
const User = require("../models/userModel");
const Venue = require("../models/venueModel");
const BookingModel = require("../models/bookingsModel");

// get admin info
const getAdminInfo = async (req, res) => {
  try {
    const admin = await User.findOne({ isAdmin: true });
    if (!admin) {
      return res
        .status(404)
        .send({ message: "Admin not Found", success: false });
    }
    admin.password = "";
    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting admin info", success: false });
  }
};

// ----------------------------- request status -----------------------------
// ------------------------------------------------------------------------
const updateReqStatus = async (req, res) => {
  try {
    const venueId = req.body.id;
    const status = req.body.status;
    const updateRequsest = await Venue.findByIdAndUpdate(
      venueId,
      {
        status: status,
      },
      { new: true }
    );
    const adminUser = await User.findOne({ isAdmin: true });
    currNotifications = adminUser.unseenNotifications?.filter(
      (notif) => notif.data.venueId == venueId
    );
    seenNotifications = adminUser.seenNotifications;
    seenNotifications?.push(...currNotifications);
    adminUser.unseenNotifications = adminUser.unseenNotifications?.filter(
      (notif) => notif.data.venueId != venueId
    );
    adminUser.seenNotifications = seenNotifications;
    const updatedUser = await adminUser.save();
    updatedUser.password = undefined;
    res
      .status(200)
      .send({
        message: "Updated request status",
        success: true,
        data: updatedUser,
      });
  } catch (error) {
    res.status(500).send({
      message: "Error in updating request status",
      success: false,
      error: error.message,
    });
  }
};

// ----------------------------- All Bookings-----------------------
// ----------------------------------------------------------------
const fetchAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error in fetching all bookings",
        error: error.message,
      });
  }
};

// Get all users from db
const fetchAllUsers = async (req, res) => {
  const isOwner = req.query.isOwner || false;
  try {
    var users
    if(req.query.isOwner) {
      users = await User.find({isOwner: isOwner , isAdmin: false})
    }else{
      users = await User.find({isAdmin: false})
    }
    res.status(200).json({success:true,users:users});
  } catch (error) {
    res.status(500)
    .json({message: "Error in fetching all users", error: error.message});
  }
}

module.exports = {
  updateReqStatus,
  getAdminInfo,
  fetchAllBookings,
  fetchAllUsers
};
