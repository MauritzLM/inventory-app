const Species = require("../models/species");

exports.index = (req, res) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of all bspecies.
exports.species_list = (req, res) => {
    res.send("NOT IMPLEMENTED: Species list");
};

// Display detail page for a specific species.
exports.species_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: Species detail: ${req.params.id}`);
};

// Display species create form on GET.
exports.species_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Species create GET");
};

// Handle species create on POST.
exports.species_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Species create POST");
};

// Display species delete form on GET.
exports.species_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Species delete GET");
};

// Handle species delete on POST.
exports.species_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Species delete POST");
};

// Display species update form on GET.
exports.species_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Species update GET");
};

// Handle species update on POST.
exports.species_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Species update POST");
};
