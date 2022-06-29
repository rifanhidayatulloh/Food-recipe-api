const express = require("express");
const {
  list,
  comments,
  insert,
  update,
  updatePublic,
  deleted,
} = require("../controllers/comment.controller");
const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin, isCustomers } = require("../middleware/authorization");

const router = express.Router();

router
  .get("/comment", jwtAuth, isAdmin, list)
  .get("/comment-by/recipe", jwtAuth, isCustomers, comments)
  .post("/comment/insert", jwtAuth, isCustomers, insert)
  .put("/comment/update/:commentId", jwtAuth, isCustomers, update)
  .put("/comment-public-view", jwtAuth, isAdmin, updatePublic)
  .delete("/comment/delete/:commentId", jwtAuth, isCustomers, deleted);

module.exports = router;
