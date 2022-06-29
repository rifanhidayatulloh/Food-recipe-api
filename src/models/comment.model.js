const db = require("../config/db");

const commentModel = {
  getCountComment: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM commentation`, (err, result) => {
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
        `SELECT * FROM commentation ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimit} OFFSET ${offset}`,
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
  selectCommentRecipe: (getSearch) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT recipe.title, users.user_name, commentation.comment_text, commentation.comment_id FROM commentation INNER JOIN recipe ON commentation.recipe_id=recipe.recipe_id JOIN users ON commentation.user_id=users.user_id WHERE (recipe.title ILIKE '%${getSearch}%' OR users.user_name ILIKE '%${getSearch}%') AND commentation.public_view=1`,
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
  append: (recipeId, commentText, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO commentation ( recipe_id, comment_text, user_id, public_view) VALUES (${recipeId},'${commentText}',${userId},1)`,
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
  update: (commentId, recipeId, commentText, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE commentation SET recipe_id=${recipeId}, comment_text='${commentText}', user_id=${userId} WHERE comment_id=${commentId} AND user_id=${userId}`,
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
  updatePublic: (commentId, publicView) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE commentation SET public_view=${publicView} WHERE comment_id=${commentId}`,
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
  deleted: (commentId, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM commentation WHERE comment_id=${commentId} AND user_id=${userId}`,
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

module.exports = commentModel;
