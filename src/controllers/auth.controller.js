const bycrpt = require("bcrypt");
const { sucses, failed, sucessWithToken } = require("../helpers/response");
const authModel = require("../models/auth.model");
const generateToken = require("../helpers/generateJwtToken");

module.exports = {
  register: async (req, res) => {
    try {
      const { userName, email, phone, password } = req.body;
      if (!userName || !email || !phone || !password) {
        failed(res, null, "Failed", "All data must be filled");
        return;
      }
      const dataEmail = await authModel.checkEmail(email);
      const checkEmail = dataEmail.rowCount;
      if (checkEmail > 0) {
        failed(res, null, "Failed", "Email registered");
      } else {
        bycrpt.hash(password, 10, async (err, hash) => {
          if (err) {
            failed(res, error.message, "Failed", "Failed hash password");
          }
          const photo = req.file.filename;
          authModel
            .append(userName, email, phone, hash, photo)
            .then((result) => {
              sucses(res, result, "Success", "Registration success");
            })
            .catch((err) => {
              failed(res, err.message, "Failed", "Registration failed");
            });
        });
      }
    } catch (err) {
      failed(res, err.message, "Failed", "Internal server error");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authModel.checkEmail(email);
      if (result.rowCount > 0) {
        bycrpt
          .compare(password, result.rows[0].password)
          .then(async (match) => {
            // sucessWithToken(res, null, "Success", "Login success");
            if (match) {
              const token = await generateToken(result.rows[0]);
              sucses(
                res,
                {
                  token,
                  user: result.rows[0],
                },
                "Success",
                "Login success"
              );
            } else {
              failed(res, null, "Failed", "Login failed");
            }
          });
      } else {
        failed(
          res,
          null,
          "Failed",
          "The email and password you entered is wrong"
        );
      }
    } catch (err) {
      failed(res, err.message, "Failed", "Internal server error");
    }
  },
};
