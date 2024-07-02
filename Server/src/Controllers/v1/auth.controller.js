import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAccessToken } from "../../utils/helper.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

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
  const inputParams = req.body;

  console.log("Req  body: ",inputParams)

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
