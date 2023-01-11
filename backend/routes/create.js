const router = require("express").Router();
const { createShortURL } = require("../controllers/createController");

router.route("/").post(createShortURL);

module.exports = router;
