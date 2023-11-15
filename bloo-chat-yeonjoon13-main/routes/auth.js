const express = require("express");
const UserDao = require("../data/UserDao");
const { verifyPassword } = require("../util/hashing");
const { createToken, verifyToken } = require("../util/token");
const router = express.Router();
const users = new UserDao();


router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await users.create({ username, password, role: "ADMIN" });
    
    res.status(201).json({ 
        message: "Successfully registered"
     });
  } catch (err) {
    res.status(500).json({ 
        message: err.message,
    });
  }
});

router.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "You must provide both username and password.",
    });
  }

  try {
    const user = await users.readOne(username);

    // Authentication!
    const isAuthenticated = await verifyPassword(password, user ? user.password : "");
    if (!isAuthenticated) {
      return res.status(403).json({
        message: "Wrong username or password!",
      });
    } else {
        const token = createToken(user);
        res.cookie("jwt", token, {
          httpOnly: true,
        });
        return res.status(200).json({
            token: token,
            username: username,
            message: "Authentication successful!",
          });
      };
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


router.post("/verify", async (req, res) => {
    const { token } = req.body;
    const isValid = await verifyToken(token);
  
    if (!isValid) {
      return res.status(403).json({
        message: "Invalid or expired token!",
      });
    }
  
    return res.json({
      message: "Token verified, and it is valid!",
      token: token,
    });
  });


/*router.post("/userAuth", async (req, res, next) => {
    const { authorization } = req.headers;
    const [_, token] = authorization.trim().split(" ");
    const valid = await verifyToken(token);
    const user = decodeToken(token);
    if (!valid || user.role !== "ADMIN") {
      return res.status(403).json({
        message:
          "You are not authorized to access this resource.",
      });
    } 
});
*/

  
module.exports = router;
