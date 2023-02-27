const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpeciesSchema = new Schema({
    common_name: { type: String, required: true },
    scientific_name: { type: String, required: true },
    description: { type: String, required: true },
    family: { type: Schema.Types.ObjectId, ref: "Family", required: true },
    population_in_zoo: { type: Number, required: true },
    genus: { type: Schema.Types.ObjectId, ref: "Genus", required: true }
});

// Virtual for URL
SpeciesSchema.virtual("url").get(function () {
    return `/catalog/species/${this.id}`;
});

module.exports = mongoose.model("Species", SpeciesSchema);