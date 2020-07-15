const jwt = require("jsonwebtoken");
const config = require("config");

function authMiddleware(req, res, next) {
  const tokenHeaders = req.headers.authorization;
  if (!tokenHeaders)
    return res.status(403).send({ auth: false, message: "No token provided." });

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userInfo = decoded;
    next();
  });
}

module.exports = authMiddleware;
