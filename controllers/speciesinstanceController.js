const SpeciesInstance = require("../models/speciesInstance");

const async = require("async");

// Display list of all SpeciesInstances.
exports.speciesinstance_list = (req, res, next) => {
    SpeciesInstance.find()
        .populate("species")
        .exec(function (err, results) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render("speciesinstance_list", { title: "Species Instance List", speciesinstance_list: results });
        });
};

// Display detail page for a specific SpeciesInstance.
exports.speciesinstance_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: SpeciesInstance detail: ${req.params.id}`);
};

// Display SpeciesInstance create form on GET.
exports.speciesinstance_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: SpeciesInstance create GET");
};

// Handle SpeciesInstance create on POST.
exports.speciesinstance_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: SpeciesInstance create POST");
};

// Display SpeciesInstance delete form on GET.
exports.speciesinstance_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: SpeciesInstance delete GET");
};

// Handle SpeciesInstance delete on POST.
exports.speciesinstance_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: SpeciesInstance delete POST");
};

// Display SpeciesInstance update form on GET.
exports.speciesinstance_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: SpeciesInstance update GET");
};

// Handle bookinstance update on POST.
exports.speciesinstance_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: SpeciesInstance update POST");
}