const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FamilySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

// Virtual for family URL
FamilySchema.virtual("url").get(function () {
    return `/catalog/family/${this._id}`;
});

module.exports = mongoose.model("Family", FamilySchema);