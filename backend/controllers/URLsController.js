const { nanoid } = require("@reduxjs/toolkit");
const ShortUrl = require("../models/ShortUrl.model");
const mongoose = require("mongoose");

const createShortURL = async (req, res) => {
  const url = req.body.url;
  let description = req.body.description;
  if (typeof description === "undefined") {
    description = "Default description";
  }
  let baseURL = process.env.BACKENDURL;
  const urlRegExp =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  if (urlRegExp.test(url) === true) {
    const short = await nanoid(7);
    let userId;
    if (req.auth) {
      userId = req.auth.payload.sub;
    } else {
      userId = null;
    }
    const newShortUrl = new ShortUrl({
      shortenedUrl: short,
      originalUrl: url,
      creator: userId,
      description: description,
    });

    try {
      await newShortUrl.save((err) => {
        if (err) {
          return res.sendStatus(400).json({ error: "something went wrong" });
        } else {
          return res.json(newShortUrl);
        }
      });
    } catch (error) {
      return res.sendStatus(400).json({ error: "something went wrong" });
    }
  } else {
    res.status(400).json({ error: "not a valid url" });
  }
};
const updateShortURL = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const { sub } = req.auth.payload;

  const item = await ShortUrl.updateOne(
    { _id: id, creator: sub },
    { description: description }
  );
  if (item.modifiedCount > 0) {
    res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
};

const deleteShortURL = async (req, res) => {
  const { id } = req.params;
  const { sub } = req.auth.payload;
  const item = await ShortUrl.findById(id);
  // const item = await ShortUrl.findOneAndDelete({ id: id, creator: sub });

  if (!item) {
    return res.sendStatus(400);
  } else if (item.creator !== sub) {
    return res.sendStatus(400);
  } else {
    item.deleteOne();
    return res.sendStatus(200);
  }
};

module.exports = {
  createShortURL,
  updateShortURL,
  deleteShortURL,
};
