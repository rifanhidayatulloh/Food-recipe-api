const db = require("../config/db");

const userModel = {
  getCountUsers: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM users`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  selctAll: (sortByField, sortByType, getLimit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimit} OFFSET ${offset}`,
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
  selectById: (userName) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT photo, user_name FROM users WHERE user_name ILIKE '%${userName}%'`,
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
  update: (userId, userName, phone, filePhoto) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET user_name='${userName}', phone='${phone}', photo='${filePhoto}' WHERE user_id=${userId}`,
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
  activeNonActive: (isActive, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET level=${isActive} WHERE user_id=${userId}`,
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
  checkPhotoUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT photo FROM users WHERE user_id=${userId}`,
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
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE user_id=${userId}`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  // deleted: (userId) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`DELETE FROM users WHERE user_id=${userId}`, (err, result) => {
  //       if (err) {
  //         reject(new Error(err.message));
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   });
  // },
  selectUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE user_id=${userId}`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = userModel;
