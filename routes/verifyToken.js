const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json("Autorisation insuffisante !");
  try {
    const verified = jwt.verify(token, process.env.salt);
    req.user = verified;

    next();
  } catch (err) {
    res.status(400).json("votre token est invalide!");
  }
};
