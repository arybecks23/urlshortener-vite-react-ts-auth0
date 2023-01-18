const router = require("express").Router();
const {
  createShortURL,
  updateShortURL,
  deleteShortURL,
} = require("../controllers/URLsController");
const { getMyURLs } = require("../controllers/myURLsController");
const { checkJwt } = require("../middleware/auth");

router.route("/").post(createShortURL);
router.route("/").get(getMyURLs, (req, res) => {
  if (req.urls) {
    res.json(req.urls);
  } else {
    res.sendStatus(204);
  }
});
router.route("/:id").patch(updateShortURL);
router.route("/:id").delete(deleteShortURL);

module.exports = router;
