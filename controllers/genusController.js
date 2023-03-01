const Genus = require("../models/genus");

// Display list of all Genus.
exports.genus_list = (req, res) => {
    res.send("NOT IMPLEMENTED: Genus list");
};

// Display detail page for a specific Genus.
exports.genus_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: Genus detail: ${req.params.id}`);
};

// Display Genus create form on GET.
exports.genus_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Genus create GET");
};

// Handle Genus create on POST.
exports.genus_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Genus create POST");
};

// Display Genus delete form on GET.
exports.genus_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Genus delete GET");
};

// Handle Genus delete on POST.
exports.genus_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Genus delete POST");
};

// Display Genus update form on GET.
exports.genus_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Genus update GET");
};

// Handle Genus update on POST.
exports.genus_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Genus update POST");
};
