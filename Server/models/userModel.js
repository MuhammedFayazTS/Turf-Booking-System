const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    // phone:{
    //     type:Number,
    //     required:true
    // },
    image:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isOwner:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    seenNotifications:{
        type:Array,
        default:[]
    },
    unseenNotifications:{
        type:Array,
        default:[]
    },
},
{
    timestamps:true
}
)

const userModel = mongoose.model('users',userSchema)

module.exports = userModel