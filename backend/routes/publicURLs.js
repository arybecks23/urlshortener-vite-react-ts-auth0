const router = require("express").Router();
const { createShortURL } = require("../controllers/URLsController");

router.route("/").post(createShortURL);

module.exports = router;
