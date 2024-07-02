import mongoose from "mongoose";
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Joi from "@hapi/joi";

// user schema for validation
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  phone: Joi.string().min(8).max(15).required(),
  username: Joi.string().min(4).max(10).required(),
});

//validation middleware function
export const validate = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(new ApiResponse(400,"Invalid request",error.details[0].message));
  }

  next();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

const sendEmailForAccountActivation = async (inputParams, url) => {
  const templatePath = path.resolve(
    __dirname,
    "../services/email/account-activation.ejs"
  );

  const mailOptions = {
    from: "sports.hub.booking@gmail.com",
    to: inputParams.email,
    subject: "Activate your Sports Hub account",
    attachments: [
      // {
      //   filename: 'logo.png',
      //   path: `${path}/email/templates/images/logo.png`,
      //   cid: 'logo', // same cid value as in the html img src
      // },
    ],
  };

  const params = {
    url,
    username: inputParams.username,
  };

  ejs.renderFile(templatePath, { params, path: path }, (err, data) => {
    if (err) throw err;

    mailOptions.html = data;

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) throw error;

      console.log("Email sent: " + info.response);
    });
  });
};

const signup = asyncHandler(async (req, res) => {
  // get data from frontend
  // validate inputs
  // check if user already exists
  const { email, password, phone, username } = req.body;

  const inputParams = req.body;

  // const token = await createAccessToken(inputParams);

  // const activationUrl = `${process.env.CORS_ORIGIN}activate/account?token=${token}`;

  // await sendEmailForAccountActivation(inputParams, activationUrl);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        inputParams,
        "User signed up successfully. Account verification email has been sent to your email address."
      )
    );
});

export { signup };
