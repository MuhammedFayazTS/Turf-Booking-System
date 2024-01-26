const mongoose = require("mongoose");
const User = require("../models/userModel");
const Venue = require("../models/venueModel");
const BookingModel = require("../models/bookingsModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ratingModel = require("../models/ratingModel");
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const registerController = async (req, res) => {
  try {
    const userExist = await User.findOne({
      email: req.body.email,
      success: false,
    });
    if (userExist) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10); //generate salt for password hashing
    const hashedPassword = await bcrypt.hash(password, salt); //hasing password with salt amount
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User Created successfully", success: true });
  } catch (error) {
    res.status(500).send({
      message: "Error Creating the user",
      success: false,
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password); //comparing the encrypted password in db with entered password
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, token }); //on login success send the token.
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error: error });
  }
};

// get user info by token
const getUserInfoByToken = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: { user },
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting user info",
      success: false,
      error: error,
    });
  }
};
// getUserInfoByid
const getUserInfoById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: { user },
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting user info",
      success: false,
      error: error.message,
    });
  }
};

// -----------------------------Notifications -----------------------------
// ------------------------------------------------------------------------

// mark all notification as seen
const markAllAsSeen = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    if (!unseenNotifications) {
      return res
        .status(200)
        .send({ message: "No notifications found", success: false });
    }
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "All notifications updated",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting notifications",
      success: false,
      error: error.message,
    });
  }
};

// delete all notification from seen
const deleteAllNotifiications = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    const seenNotifications = user.seenNotifications;
    if (!seenNotifications) {
      return res
        .status(200)
        .send({ message: "No notifications found", success: false });
    }
    user.seenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "All notifications deleted",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting notifications",
      success: false,
      error: error.message,
    });
  }
};

// ----------------------Bookings --------------------
// ---------------------------------------------------
const bookAppoimentController = async (req, res) => {
  try {
    const bookedVenue = await Venue.findOne({ _id: req.body.venueId });
    const ownerUser = await User.findOne({ _id: req.body.ownerId });
    const user = await User.findOne({ _id: req.body.userId });
    // ---------------------------------------------------------------------------
    // --------------------------if venue is owned by user------------------------
    if (bookedVenue.userId === req.body.userId) {
      return res
        .status(200)
        .send({ message: "You cannot book your own venue", success: false });
    }
    // ---------------------Creating initial status for booking--------------------
    req.body.status = "pending";
    const newBooking = new BookingModel(req.body);
    await newBooking.save();
    // ---------------------------------------------------------------------------
    // --------------------------add time slot in  booked timing  ----------------
    notAvailableTimings = bookedVenue.notAvailableTimings;
    let bookedTiming = {
      date: req.body.date,
      time: req.body.time,
    };
    notAvailableTimings.push(bookedTiming);
    bookedVenue.notAvailableTimings = notAvailableTimings;
    bookedVenue.save();
    // ---------------------------------------------------------------------------
    // --------------------------organizer user notification ---------------------
    unseenNotificationsOwner = ownerUser.unseenNotifications;
    unseenNotificationsOwner.push({
      type: "New Booking request",
      message: `A new Booking request from ${req.body.userInfo.username}`,
      data: {
        name: req.body.userInfo.username,
      },
      onClickPath: "/booking-summary",
    });
    ownerUser.unseenNotifications = unseenNotificationsOwner;
    // ----------------------------------------------------------------------
    // --------------------------user notification --------------------------
    unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "New Booking request",
      message: `A new Booking request send to ${ownerUser.username}`,
      data: {
        name: req.body.userInfo.username,
      },
      onClickPath: "/my-profile/my-bookings",
    });
    user.unseenNotifications = unseenNotifications;
    await ownerUser.save();
    await user.save();
    res
      .status(200)
      .send({ message: "Booking is successfull", success: true, user: user });
  } catch (error) {
    res.status(500).send({
      message: "Error while booking",
      error: error.message,
      success: false,
    });
  }
};

// --------------------- Get All User Booking --------------------
// ---------------------------------------------------------------
const getAllUserBookings = async (req, res) => {
  // filter according to status
  let status = req.query.status || ''
  let statusText = { $regex: status, $options: "i" }
  try {
    const bookings = await BookingModel.find({ userId: req.body.userId,status:statusText })
    res.send(bookings);
  } catch (error) {
    res.status(500).send({
      message: "Error while getting all bookings",
      error: error.message,
      success: false,
    });
  }
};

// --------------------- Get All venue Booking --------------------
// ---------------------------------------------------------------
const getAllVenueBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ ownerId: req.body.userId });
    res.send(bookings);
  } catch (error) {
    res.status(500).send({
      message: "Error while getting all bookings",
      error: error.message,
      success: false,
    });
  }
};


// ---------------------------------------------------------------
// --------------------------- Rating ----------------------------
const ratingController = async (req, res) => {
  const {rate,message,venueId,userId} = req.body  
  try {
      const existingRating = await ratingModel.findOne({userId,venueId})
      if(existingRating){
        return res.status(200).send({message: "Rating already added", success:false})
      }else{
        const newRating = await ratingModel.create({
          rate,message,venueId,userId
        })
        await newRating.save()
        return res.status(201).send({ message: "Rating added successfully", success: true });
      }
    } catch (error) {
      res.status(500).send({message: error.message,success:false})
    }
}


// ---------------------------------------------------------------
// ------------------------Checkout controller--------------------
const checkoutController = async(req, res) => {
  const {products} = req.body;
  const lineItems = products.map((product)=>({
    price_data:{
      currency:"usd",
      product_data:{
        name:product.name,
        // images:[product.venueInfo.images]
      },
      unit_amount:product.price,
    },
    quantity:product.quantity || 1
  }))
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/",
      cancel_url:"http://localhost:3000/asdssd"
    })

    res.json({id:session.id})
  } catch (error) {
    res.status(500)
    .json({error:error.message})
  }
}



module.exports = {
  registerController,
  loginController,
  getUserInfoById,
  getUserInfoByToken,
  markAllAsSeen,
  deleteAllNotifiications,
  bookAppoimentController,
  getAllUserBookings,
  getAllVenueBookings,
  checkoutController,
  ratingController
};
