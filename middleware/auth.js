const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  //extract token

  const token = req.headers("authorization");

  if (!token) {
    res.status(400).json({ msg: " you are not authorized" });
  }
  try {
    // verify token
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({ msg: "Invalid Token" });
  }
};
module.exports = auth;
