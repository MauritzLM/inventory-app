const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenusSchema = new Schema({
    name: { type: String, required: true },
    family: { type: Schema.Types.ObjectId, required: true }
});

GenusSchema.virtual("url").get(function () {
    return `/catalog/genus/${this.id}`;
});

module.exports = mongoose.model('Genus', GenusSchema);