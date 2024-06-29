const { default: mongoose } = require("mongoose");

const ratingSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    venueId:{
        type:String,
        required:true,
    },
    rate:{
        type:Number,
        required:true,
    },
    message:{
        type:String,
    },
},{timeStamps:true})

const ratingModel = mongoose.model("rating", ratingSchema)

module.exports = ratingModel