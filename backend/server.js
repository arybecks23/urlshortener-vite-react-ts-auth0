const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const mongoose = require("mongoose");

const ShortUrl = require("./models/ShortUrl.model");
const { getMyURLs } = require("./controllers/myURLsController");
// const publicCreateRoute = require("./routes/publicCreate");
// const privateCreateRoute = require("./routes/privateCreate");
const createRoute = require("./routes/create");
const dbUri = process.env.ATLAS_URI;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, "../dist")));

const checkJwt = auth({
  audience: "http://localhost:5600",
  issuerBaseURL: `https://armanist.us.auth0.com/`,
  // audience: process.env.AUTH0_API_IDENTIFIER,
  // issuerBaseURL: process.env.AUTH0_ISSUER,
});

// app.use(checkJwt);

mongoose.connect(dbUri);
mongoose.connection.once("open", () => {
  console.log("Connection established successfully.");
});

app.use("/api/public/create", createRoute);
app.use("/api/private/create", checkJwt, createRoute);

app.get("/api/private/myurls", checkJwt, getMyURLs, (req, res) => {
  if (req.urls) {
    res.json(req.urls);
  } else {
    res.sendStatus(204);
  }
});

app.get("/*", async (req, res) => {
  const short = req.params[0];
  const result = await ShortUrl.findOneAndUpdate(
    { shortenedUrl: short },
    { $inc: { clicks: 1 } }
  );
  if (result) {
    console.log(result.originalUrl);
    res.redirect(result.originalUrl);
  } else {
    res.sendStatus(404);
  }
});

// const checkScopes = requiredScopes("read:messages");
// app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
//   res.json({
//     message:
//       "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
//   });
// });

app.listen(5600, function () {
  console.log("Listening on http://localhost:5600");
});
