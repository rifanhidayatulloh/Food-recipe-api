const { reject } = require("bcrypt/promises");
const db = require("../config/db");

const authModel = {
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  append: (userName, email, phone, password, photo) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users( user_name, email, phone, password, photo) VALUES ($1, $2, $3, $4, $5)",
        [userName, email, phone, password, photo],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = authModel;
