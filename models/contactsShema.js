const mongoose = require("mongoose");

const contatsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.ObjectId,
    ref: "user",
  },
});
const Contacts = mongoose.model("contacts", contatsSchema);

module.exports = {
  Contacts,
};
