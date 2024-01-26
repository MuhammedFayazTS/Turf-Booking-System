const { default: mongoose } = require("mongoose");

const venueSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    include: {
      type: Array,
      required: true,
    },
    amenities: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    lightsOn: {
      type: Number,
      default:'0',
    },
    images:{
      type:Array,
      default:[]
    },
    availableTimings: {
      type: Array,
      required: true,
    },
    notAvailableTimings: {
      type: Array,
      default:[]
    },
    status:{
      type:String,
      default:'pending'
    }
  },
  {
    timestamps: true,
  }
);

const venueModel = mongoose.model("Venue", venueSchema);
module.exports = venueModel;
