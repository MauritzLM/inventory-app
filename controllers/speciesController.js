const Species = require("../models/species");
const Families = require("../models/family");
const Genus = require("../models/genus");
const SpeciesInstances = require("../models/speciesInstance");

const { body, validationResult } = require("express-validator");

const async = require("async");

// Display homepage
exports.index = (req, res) => {
    async.parallel({
        families_count: function (callback) {
            Families.countDocuments({}, callback);
        },
        species_count: function (callback) {
            Species.countDocuments({}, callback);
        },
        genus_count: function (callback) {
            Genus.countDocuments({}, callback);
        },
        population: function (callback) {
            SpeciesInstances.countDocuments({}, callback);
        },
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
exports.species_create_get = (req, res, next) => {
    async.parallel({
        genesus: function (callback) {
            Genus.find().exec(callback);
        },
        families: function (callback) {
            Families.find().exec(callback);
        }
    },
        (err, results) => {
            if (err) {
                return next(err)
            }
            res.render("species_form", {
                title: "Create new species",
                genus_list: results.genesus,
                family_list: results.families
            });
        }
    )
};

// Handle species create on POST.
exports.species_create_post = [
    // validate & sanitize data
    body("species_name", "Please enter a name")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("scientific_name", "Please provide a valid scientific name")
        .trim()
        .isLength({ min: 5 })
        .escape(),
    body("species_description", "Please enter a description")
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body("species_family", "Please select a family")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("population")
        .trim()
        .escape(),
    body("species_genus", "Please select a genus")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {

        const errors = validationResult(req);

        const species = new Species({
            common_name: req.body.species_name,
            scientific_name: req.body.scientific_name,
            description: req.body.species_description,
            family: req.body.species_family,
            population_in_zoo: req.body.population,
            genus: req.body.species_genus
        });

        if (!errors.isEmpty()) {
            // found errors
            async.parallel({
                genesus: function (callback) {
                    Genus.find().exec(callback);
                },
                families: function (callback) {
                    Families.find().exec(callback);
                }
            }, (err, results) => {
                if (err) {
                    return next(err);
                }
                // re-render form 
                res.render("species_form", {
                    title: "Create new species",
                    species,
                    genus_list: results.genesus,
                    family_list: results.families,
                    errors: errors.array()
                })
            });
            return;
        }
        // save new species
        species.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(species.url);
        });
    }
];

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
