require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./app/models");
const authRoute = require("./app/router/authRoute");
const userRoute = require("./app/router/userRoute");
const busRoute = require("./app/router/busRoute");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["*"],
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(userRoute);
app.use(authRoute);
app.use(busRoute);

const port = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
