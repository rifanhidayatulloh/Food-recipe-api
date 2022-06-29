const db = require("../config/db");

const recipeModel = {
  getCountRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM recipe`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  select: (getSearch, getLimit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE title ILIKE '%${getSearch}%' ORDER BY recipe_id ASC LIMIT ${getLimit} OFFSET ${offset}`,
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
  myRecipe: (getSearch, getLimit, offset, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE title ILIKE '%${getSearch}%' AND user_id=${userId} ORDER BY recipe_id DESC LIMIT ${getLimit} OFFSET ${offset}`,
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
  getCountPublic: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM recipe WHERE public_view=1`,
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
  selectRecipePublic: (getSearch, getLimit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT recipe.video, recipe.photo, recipe.title, recipe.ingredients, users.user_name, recipe.recipe_id FROM recipe INNER JOIN users ON recipe.user_id=users.user_id WHERE (users.user_name ILIKE '%${getSearch}%' OR recipe.title ILIKE '%${getSearch}%') AND recipe.public_view=1 ORDER BY recipe.dates DESC LIMIT ${getLimit} OFFSET ${offset}`,
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
  selectRecipeId: (recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE recipe_id=${recipeId}`,
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
  selectNewRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe ORDER BY dates DESC LIMIT 6`,
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
  append: (photo, title, ingredients, video, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recipe( photo, title, ingredients, video, dates, user_id, public_view) VALUES ('${photo}', '${title}', '${ingredients}','${video}',NOW(),${userId},${1})`,
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
  update: (userId, filePhoto, title, ingredients, video, recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipe SET photo='${filePhoto}', title='${title}', ingredients='${ingredients}', video='${video}', dates=NOW() WHERE user_id=${userId} AND recipe_id=${recipeId}`,
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
  publicView: (recipeId, publicView) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipe SET public_view=${publicView} where recipe_id=${recipeId}`,
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
  check: (recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT photo FROM recipe WHERE recipe_id=${recipeId}`,
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
  deleted: (userId, recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM recipe WHERE user_id=${userId} AND recipe_id=${recipeId}`,
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

module.exports = recipeModel;
