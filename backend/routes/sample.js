const router = require("express").Router();
const {
  getAllSamples,
  getSample,
  editSample,
  createSample,
  deleteSample,
} = require("../controllers/sampleController");

router.route("/").get(getAllSamples);
router.route("/:itemId").get(getSample);
router.route("/:itemId").post(editSample);

router.post("/new", createSample);

router.route("/item/:id").delete(deleteSample);

module.exports = router;
