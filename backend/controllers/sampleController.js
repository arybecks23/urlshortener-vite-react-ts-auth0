const Sample = require("../models/sample.model");

const getAllSamples = async (req, res) => {
  // const sortBy = req.query.sort_by;
  // const orderBy = req.query.order_by;

  let sortArray = {};
  if (sortBy && orderBy) {
    sortArray[sortBy] = orderBy == "desc" ? -1 : 1;
  } else if (sortBy) {
    sortArray[sortBy] = 1;
  }
  const items = await Sample.find().sort(sortArray);
  if (!items) {
    res.sendStatus(400);
  }
  res.json(items);
  res.status(200).json({ message: "Successful" });
};

const getSample = async (req, res) => {
  const { itemId } = req.params;
  const item = await Sample.findById(itemId);

  if (!item) {
    return res.sendStatus(400);
  }
  res.status(200);
  res.json(item);
};

const editSample = async (req, res) => {
  const item = new Sample({
    name: req.body.name,
    sn: req.body.sn,
    sku: req.body.sku,
    count: Number(req.body.count),
    criticalLow: 2,
  });
  try {
    await item.save();
  } catch (error) {
    return res.status(500).send(error.message);
  }

  res.status(200).json(req.body);
};
const createSample = async (req, res) => {
  const item = new Sample({
    name: req.body.name,
    sn: req.body.sn,
    sku: req.body.sku,
    count: Number(req.body.count),
    criticalLow: 2,
  });
  try {
    await item.save();
  } catch (error) {
    return res.status(500).send(error.message);
  }

  res.status(200).json(req.body);
};
const deleteSample = async (req, res) => {
  const { id } = req.params;

  const item = await Sample.findByIdAndRemove(id);
  if (!item) {
    return res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
};

module.exports = {
  getAllSamples,
  getSample,
  editSample,
  createSample,
  deleteSample,
};
