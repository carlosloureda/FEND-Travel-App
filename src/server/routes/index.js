const router = require("express").Router();
const { check } = require("express-validator");
const weather = require("./weather");
router.get("/", (req, res) => {
  console.log("[/] endpoint called");
  res.status(200).send("Hi from server");
});

// req should have a text file
router.get(
  "/weather-forecast",
  [
    check("city").isString(),
    check("country").isString(),
    check("time").isInt()
  ],
  weather.getForecastRouteHandler
);
// TODO: Add the endpoint where it receives the city or country and receives everything

module.exports = router;
