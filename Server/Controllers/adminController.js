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

// *********************************************************************************
// ************************************ Remove *************************************
// *********************************************************************************

// --------------------------------Delete a user from-------------------------------
// ---------------------------------------------------------------------------------
const removeUserById = async(req, res) => {
  const {id} = req.params
  try {
  const userDeleted = await User.deleteOne({_id: id})
  if(userDeleted.deletedCount === 1){
    const users = await User.find({isAdmin:false}).select('-password')
    return res.status(200).json({message: "User removed successfully",success:true,users:users});
  }    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// --------------------------------Delete a venue from-------------------------------
// ---------------------------------------------------------------------------------
const removeVenueById = async(req, res) => {
  const {id} = req.params
  try {
  const venueDeleted = await Venue.deleteOne({_id: id})
  if(venueDeleted.deletedCount === 1){
    const venues = await Venue.find()
    return res.status(200).json({message: "Venue removed successfully",success:true,venues:venues})
  }    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// --------------------------------Delete a booking from-------------------------------
// ---------------------------------------------------------------------------------
const removeBookingById = async(req, res) => {
  const {id} = req.params
  try {
  const bookkingDeleted = await BookingModel.deleteOne({_id: id})
  if(bookkingDeleted.deletedCount === 1){
    const bookings = await BookingModel.find()
    return res.status(200).json({message: "Booking removed successfully",success:true,bookings:bookings})
  }    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// *********************************************************************************
// ************************************  Edit  *************************************
// *********************************************************************************

// --------------------------------edit a user from-------------------------------
// ---------------------------------------------------------------------------------
const editUserById = async(req, res) => {
  const {id} = req.params
  const {username,email,image,isOwner} = req.body
  console.log(username, email)
  try {
  const user = await User.findOne({_id: id})
  if(!user){
    return res.status(404).json({message: "User not found",success:false})
  }else{
      user.username = username?username:user.username
      user.email = email?email:user.email
      user.image = image?image:user.image 
      user.isOwner = isOwner !== undefined ? isOwner : user.isOwner;
      await user.save()
      const users = await User.find({isAdmin: false}).select('-password')
      return res.status(200).json({message:"User edited successfully",success:true,users:users})
  }    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// --------------------------------edit a venue from-------------------------------
// ---------------------------------------------------------------------------------
const editVenueById = async(req, res) => {
  const {id} = req.params
  const {name,email,phone,price,location} = req.body
  try {
  const venue = await Venue.findOne({_id: id})
  if(!venue){
    return res.status(404).json({message: "venue not found",success:false})
  }else{
      venue.name = name?name:venue.name
      venue.email = email?email:venue.email
      venue.phone = phone?phone:venue.phone 
      venue.price = price?price:venue.price 
      venue.location = location?location:venue.location 
      await venue.save()
      const venues = await Venue.find()
      return res.status(200).json({message:"User edited successfully",success:true,venues:venues})
  }    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


module.exports = {
  updateReqStatus,
  getAdminInfo,
  fetchAllBookings,
  fetchAllUsers,
  removeUserById,
  removeVenueById,
  removeBookingById,
  editUserById,
  editVenueById
};
