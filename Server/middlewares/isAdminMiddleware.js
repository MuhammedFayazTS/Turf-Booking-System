const mongoose = require("mongoose");
const User = require("../models/userModel");

module.exports = async(req, res, next)=>{

    try {
        const {userId} = req.body
        const adminUser = await User.findOne({_id:userId})
        if(adminUser.isAdmin) {
             next()
        }else{
            res.status(401)
            .send({message:"only admins have access to this page",success:false})
        }
    } catch (error) {
        res.status(500)
        .send({message:"Error in admin page",error:error.message,success:false})
    }

}