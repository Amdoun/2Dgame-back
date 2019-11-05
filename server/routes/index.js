const express = require("express");
const router = express.Router();
const controller = require("../controllers/players")

router
      .get("/", controller.getPlayers)
      .post("/", controller.savePlayerPos)

module.exports = router;