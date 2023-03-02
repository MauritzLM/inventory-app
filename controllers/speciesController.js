const Species = require("../models/species");
const Families = require("../models/family");

const async = require("async");

exports.index = (req, res) => {
    async.parallel({
        families_count: function (callback) {
            Families.countDocuments({}, callback);
        },
        species_count: function (callback) {
            Species.countDocuments({}, callback);
        }
    },
        function (err, results) {
            res.render("index", {
                title: 'Homepage',
                error: err,
                data: results
            });
        });
};

// Display list of all species.
exports.species_list = (req, res, next) => {
    Species.find({}, "common_name")
        .exec(function (err, list_species) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render("species_list", { title: "Species List", species_list: list_species });
        });
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
