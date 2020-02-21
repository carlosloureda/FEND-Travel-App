const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("[/] endpoint called");
  res.status(200).send("Hi from server");
});

module.exports = router;
