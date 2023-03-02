const Family = require("../models/family");

// Display list of all Families.
exports.families_list = (req, res, next) => {
    Family.find().exec(function (err, results) {
        if (err) {
            return next(err);
        }
        res.render("family_list", { title: "Family list", family_list: results });
    });
};

// Display detail page for a specific Family.
exports.family_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: Family detail: ${req.params.id}`);
};

// Display Family create form on GET.
exports.family_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Family create GET");
};

// Handle Family create on POST.
exports.family_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Family create POST");
};

// Display Family delete form on GET.
exports.family_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Family delete GET");
};

// Handle Family delete on POST.
exports.family_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Family delete POST");
};

// DisplayFamily update form on GET.
exports.family_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Family update GET");
};

// Handle Family update on POST.
exports.family_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Family update POST");
};
