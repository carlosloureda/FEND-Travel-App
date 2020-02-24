// Require Express to run server and routes
const express = require("express");
const routes = require("./routes");
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

/* Routes */
app.use(express.static("dist"));
app.use(routes);

/* Setup Server */

const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;
app.listen(PORT, () => {
  console.log(`Server for Travel App project running on PORT: ${PORT}`);
  console.log(
    `Open http://localhost:${PORT}/ on your browser to see the app running`
  );
});
