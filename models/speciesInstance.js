const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpeciesInstanceSchema = new Schema({
    species: { type: Schema.Types.ObjectId, ref: "Species" },
    name: { type: String, required: true },
    age: { type: Number, required: true },
});

// Virtual for url
SpeciesInstanceSchema.virtual("url").get(function () {
    return `/catalog/speciesinstance/${this.id}`;
});

module.exports = mongoose.model("SpeciesInstance", SpeciesInstanceSchema);