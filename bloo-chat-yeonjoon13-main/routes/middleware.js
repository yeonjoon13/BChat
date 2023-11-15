const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET;
exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        console.log(decodedToken.username);
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        if (decodedToken.role !== "ADMIN") {
          return res.status(401).json({ message: "Not authorized" })
        } else {
            req.user = decodedToken.username;
          next();
        }
      }
    })
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" })
  }
}