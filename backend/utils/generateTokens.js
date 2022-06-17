const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "" + process.env.JWT_KEY, {
    //concatenating with an empty string works, but previously it was not working, so I added the empty string.
    expiresIn: "30d",
  });
};

module.exports = generateToken; //generate token is not a function.
