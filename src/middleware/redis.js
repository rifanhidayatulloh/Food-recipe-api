// const redis = require("../config/redisConfig");
// const { sucses } = require("../helpers/response");

// module.exports = {
//   getUsers: (req, res, next) => {
//     const { searchName } = req.query;
//     redis.get(`getDetailUsers:${searchName}`, (err, result) => {
//       if (!err && result !== null) {
//         const newResult = JSON.parse(result);
//         sucses(res, newResult, "redis success", "Success get data");
//       }
//       next();
//     });
//   },
// };
