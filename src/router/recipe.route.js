const express = require("express");
const {
  list,
  recipePublic,
  recipeId,
  myRecipe,
  newRecipe,
  insert,
  update,
  publicView,
  deleted,
} = require("../controllers/recipe.controller");
const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin, isCustomers } = require("../middleware/authorization");
const upload = require("../middleware/upload");

const router = express.Router();

router
  .get("/recipe", jwtAuth, isAdmin, list)
  .get("/recipe-myrecipe", jwtAuth, myRecipe)
  .get("/recipe-select-public", recipePublic)
  .get("/recipe-by-id/:recipeId", recipeId)
  .get("/recipe-latest", newRecipe)
  .post("/recipe-insert", jwtAuth, upload, insert)
  .put("/recipe-update/:recipeId", jwtAuth, upload, update)
  .put("/recipe-public-view/:recipeId", jwtAuth, isAdmin, publicView)
  .delete("/recipe-delete/:recipeId", jwtAuth, deleted);

module.exports = router;
