const asyncHandler = require("express-async-handler"); // aync handler will be responsible to handle errors.
const User = require("../models/userModels");
const generateTokens = require("../utils/generateTokens");

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body; //requesting from the users for the followings.

  const userExists = await User.findOne({ email }); // finding user from User Models with email.

  if (userExists) {
    res.status(404);
    throw new Error("User already exists!");
  }

  const newUser = await User.create({
    // if the user does not exits, then we'll create the user
    name,
    email,
    password,
    pic,
  });

  if (newUser) {
    //if account is successfully created, then response from the backend
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      pic: newUser.pic,
      token: generateTokens(newUser.id),
    });
  } else {
    res.status(404);
    throw new Error("Error occured!");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //requesting from the users for the followings.

  const userau = await User.findOne({ email }); // finding user from User Models with email.

  if (userau && (await userau.matchPassword(password))) {
    res.status(201).json({
      _id: userau._id, // this id should be with userau which is for login purposes.
      name: userau.name,
      email: userau.email,
      isAdmin: userau.isAdmin,
      pic: userau.pic,
      token: generateTokens(userau.id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password!");
  }
});

module.exports = { userRegister, userLogin };
