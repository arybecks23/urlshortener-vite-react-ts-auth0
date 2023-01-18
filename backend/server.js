const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const { checkJwt } = require("./middleware/auth");
const mongoose = require("mongoose");

const ShortUrl = require("./models/ShortUrl.model");
const { getMyURLs } = require("./controllers/myURLsController");
// const publicCreateRoute = require("./routes/publicCreate");
// const privateCreateRoute = require("./routes/privateCreate");
const publicURLsRoute = require("./routes/publicURLs");
const privateURLsRoute = require("./routes/privateURLs");
const dbUri = process.env.ATLAS_URI;
const corsWhitelist = [
  "http://localhost:5500",
  "http://localhost:5173",
  "http://localhost:5555",
];
app.use(
  cors({
    origin: corsWhitelist,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, "../dist")));

// app.use(checkJwt);

mongoose.connect(dbUri);
mongoose.connection.once("open", () => {
  console.log("Connection established successfully.");
});

app.use("/api/public/urls", publicURLsRoute);
app.use("/api/private/urls", checkJwt, privateURLsRoute);

// app.get("/api/private/myurls", checkJwt, getMyURLs, (req, res) => {
//   if (req.urls) {
//     res.json(req.urls);
//   } else {
//     res.sendStatus(204);
//   }
// });

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
