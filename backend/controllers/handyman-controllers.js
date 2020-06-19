const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const HandyMan = require("../models/handyMan");
const User = require("../models/users");

const upgradeToHandyMan = async (req, res, next) => {
  const {
    areaOfInterest,
    skills,
    spokenLanguages,
    city,
    country,
    address,
    companyName,
    companyAddress,
    companyWebsite,
    companyPhone,
    experience,
  } = req.body;

  const { userId } = req.userData;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a user", 500)
    );
  }

  if (userId !== req.userData.userId) {
    return next(new HttpError("You do not have edit privileges.", 401));
  }

  const createdHandyMan = new HandyMan({
    info: userId,
    areaOfInterest,
    skills,
    spokenLanguages,
    city,
    country,
    address,
    companyName,
    companyAddress,
    companyWebsite,
    companyPhone,
    experience,
  });

  try {
    await createdHandyMan.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up user to DB failed.", 500);
    return next(error);
  }

  res.status(201).json({
    handyManId: createdHandyMan.id,
  });
};

exports.upgradeToHandyMan = upgradeToHandyMan;