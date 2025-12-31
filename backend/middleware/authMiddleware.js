const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const [scheme, token] = authHeader.split(" ");
    const jwtToken = scheme === "Bearer" ? token : authHeader;

    if (!jwtToken) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
