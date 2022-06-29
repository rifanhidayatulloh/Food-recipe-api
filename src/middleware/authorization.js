const { failed } = require("../helpers/response");

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next();
    } else {
      failed(res, null, "failed", "user dont have access");
    }
  },
  isCustomers: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next();
    } else {
      failed(res, null, "failed", "you dont have access");
    }
  },
};
