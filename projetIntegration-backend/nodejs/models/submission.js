const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  brandName: String ,
  proofURL: String,

  reason: String,

  alternativeBrand: String,

  submissionType: {
    type: String,
    enum: ["ALTERNATIVE", "BOYCOTT"],
    default: "ALTERNATIVE",
  }

});

module.exports = mongoose.model("Submission", submissionSchema);
