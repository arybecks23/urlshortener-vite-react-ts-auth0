const { nanoid } = require("@reduxjs/toolkit");
const ShortUrl = require("../models/ShortUrl.model");
const mongoose = require("mongoose");

const createShortURL = async (req, res) => {
  const url = req.body.url;
  let baseURL = process.env.BACKENDURL;
  const urlRegExp =
    /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi;

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

module.exports = {
  createShortURL,
};
