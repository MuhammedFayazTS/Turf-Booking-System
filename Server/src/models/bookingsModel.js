const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    venueId:{
        type:String,
        required:true,
    },
    ownerId:{
        type:String,
        required:true,
    },
    venueInfo:{
        type:Object,
        required:true,
    },
    userInfo:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    sport:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:'pending',
    },
    time:{
        type:String,
        required:true,
    },

},
{
    timestamps:true,
}
)

const appoimentModel = mongoose.model('bookings',bookingsSchema)

module.exports = appoimentModel