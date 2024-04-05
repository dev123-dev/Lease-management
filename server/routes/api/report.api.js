const express = require("express");
const router = express.Router();

router.post("/test", async (req, res) => {
  let data = req.body;
  try {
    console.log("set", data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
