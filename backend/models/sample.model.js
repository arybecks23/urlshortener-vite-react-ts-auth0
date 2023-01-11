const mongoose = require("mongoose");

const sampleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sn: {
      type: String,
    },
    sku: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    criticalLow: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Sample = mongoose.model("Sample", sampleSchema);

module.exports = Sample;
