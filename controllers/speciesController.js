const Species = require("../models/species");
const Families = require("../models/family");
const SpeciesInstances = require("../models/speciesInstance");

const async = require("async");

// Display homepage
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
    Species.find()
        .exec(function (err, results) {
            if (err) {
                return next(err);
            }
            res.render("species_list", { title: "Species List", species_list: results })
        })
};

// Display detail page for a specific species.
exports.species_detail = (req, res, next) => {
    async.parallel({
        species: function (callback) {
            Species.findById(req.params.id)
                .populate("family")
                .populate("genus")
                .exec(callback)
        }, species_instances: function (callback) {
            SpeciesInstances.find({ species: req.params.id }).exec(callback)
        }

    },
        (err, results) => {
            if (err) {
                return next(err)
            }
            res.render("species_detail", {
                title: `${results.species.common_name} page`,
                species: results.species,
                species_instances: results.species_instances
            });
        }
    )
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
