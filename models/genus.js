const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenusSchema = new Schema({
    name: { type: String }
});

GenusSchema.virtual("url").get(function () {
    return `/catalog/genus/${this.id}`;
});