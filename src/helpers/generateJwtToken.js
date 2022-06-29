const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./env");

module.exports = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  return token;
};
