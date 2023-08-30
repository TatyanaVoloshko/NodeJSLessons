const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users");
});

router.post("/", (req, res) => {
  res.send("Create user");
});


module.exports = router;
