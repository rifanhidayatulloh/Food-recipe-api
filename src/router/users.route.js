const express = require("express");
const {
  list,
  detail,
  update,
  activeNonactive,
  deleteUser,
  selectUserId,
} = require("../controllers/users.controller");
const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin, isCustomers } = require("../middleware/authorization");
const upload = require("../middleware/upload");
// const { getUsers } = require("../middleware/redis");

const router = express.Router();

router
  .get("/users-detail-id", jwtAuth, selectUserId)
  .get("/users", jwtAuth, isAdmin, list)
  .get("/users-detail", jwtAuth, isCustomers, detail)
  .put("/users-update", jwtAuth, isCustomers, upload, update)
  .put("/users-isactive/:userId", jwtAuth, isAdmin, activeNonactive)
  .delete("/users-delete", jwtAuth, deleteUser);

module.exports = router;
