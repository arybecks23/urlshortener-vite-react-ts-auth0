const ShortUrl = require("../models/ShortUrl.model");
const mongoose = require("mongoose");

const getMyURLs = async (req, res, next) => {
  const myURLs = await ShortUrl.find({
    creator: req.auth.payload.sub,
  });

  if (myURLs.length > 0) {
    req.urls = myURLs;
  }

  next();
};

module.exports = {
  getMyURLs,
};
