const mongoose = require("mongoose");
const Venue = require("../models/venueModel");
const User = require("../models/userModel");
const ratingModel = require("../models/ratingModel");

// create a new venue
const registerVenueController = async (req, res) => {
  const { email } = req.body;
  try {
    const existingVenue = await Venue.findOne({ email: email });
    if (existingVenue) {
      return res.status(200).send({ message: "Venue already registered" });
    }
    const newVenue = new Venue({ ...req.body, status: "pending" });
    await newVenue.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-venue-request",
      message: `${newVenue.name} ha applied for venue registration`,
      data: {
        venueId: newVenue._id,
        name: newVenue.name,
      },
      onClickPath: "/admin/venues",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res
      .status(200)
      .send({ message: "Venue Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "Error in registering venue",
        success: false,
        error: error.message,
      });
  }
};

// get all venues
const getAllVenues = async (req, res) => {
  // -------------------------- Sort ------------------------------
  let sort = req.query.sort || "price";
  let [field, order] = sort?sort?.split(","):"";
  let sortValue = order == "asc" ? 1 : -1;
  // --------------------- Page and limit ------------------------
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  // --------------------- include filter ------------------------
  let sports = req.query.sports || "All";
  const sportsOptions = [
    "Football",
    "Cricket",
    "Badminton",
    "Swimming",
    "Basketball",
    "Tennis",
    "VolleyBall",
    "Table Tennis",
    "Boxing"
  ];
  sports === "All"
    ? (sports = [...sportsOptions])
    : (sports = req.query.sports.split(","));
  // --------------------- Amenities filter-----------------------
  let amenities = req.query.amenities || "All";
  const amenitiesOptions = [
    "Parking",
    "Drinking Water",
    "Washroom",
    "Food Court",
    "WiFi",
    "Restroom",
    "Seating Area",
    "Storage System",
    "First Aid Station"
  ];
  amenities === "All"
    ? (amenities = [...amenitiesOptions])
    : (amenities = req.query.amenities.split(","));
  // --------------------- Search filter-----------------------
  let searchKeyword = req.query.search || "";
  let search = { $regex: searchKeyword, $options: "i" };
    // --------------------- Price filter-----------------------
    let minPrice = parseFloat(req.query.minPrice) || 0;
    let maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
    let priceFilter = { $gte: minPrice, $lte: maxPrice };
    // --------------------- location filter-----------------------
    let locationKeyword = req.query.location == 'All'?"":req.query.location || "";
    let location = { $regex: locationKeyword, $options: "i" }
  try {
    const allVenues = await Venue.find({
      status: "approved",
      userId: { $ne: req.body.userId },
      name: search,
      price: priceFilter,
      location:location
    })
      .where("include")
      .in([...sports])
      .where("amenities")
      .in([...amenities])
      .sort({ [field]: sortValue })
      .skip(page * limit);
    res.send(allVenues);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error in getting all venues",
        error: error.message,
        success: false,
      });
  }
};

// get 3 venues for listing in landing page
const getFeaturedVenues = async (req, res) => {
  try {
    const allVenues = await Venue.find({ status: "approved" }).limit(3);
    res.status(200).send(allVenues);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error in getting all venues",
        error: error.message,
        success: false,
      });
  }
};

// get a venue with id
const getVenueInfoById = async (req, res) => {
  try {
    const venue = await Venue.findOne({ _id: req.params.id });
    if (!venue) {
      return res
        .status(200)
        .send({
          message: "Error in getting venue details",
          error: error.message,
          success: false,
        });
    }
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).send("Error in getting venue details.");
  }
};

// ---------------------------------------------------------------
// ------------------------get Rating ----------------------------
const getVenueRating = async (req, res) => {
  const venueId = req.params.id  
  try {
      const reviews = await ratingModel.find({venueId})
      const reviewsWithUserInfo = [];

        for (const review of reviews) {
            const userInfo = await User.findOne({ _id: review.userId }).select('username image');
            const reviewWithUserInfo = {
                ...review.toObject(),
                userInfo: userInfo ? userInfo.toObject() : null
            };
            reviewsWithUserInfo.push(reviewWithUserInfo);
        }
      res.status(200).json({reviews: reviewsWithUserInfo,success: true})
    } catch (error) {
      res.status(500).send({message:error.message}); 
    }
}

module.exports = {
  registerVenueController,
  getAllVenues,
  getVenueInfoById,
  getFeaturedVenues,
  getVenueRating
};
