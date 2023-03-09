const SpeciesInstance = require("../models/speciesInstance");
const Species = require("../models/species");

const { body, validationResult } = require("express-validator");

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
exports.speciesinstance_detail = (req, res, next) => {
    SpeciesInstance.findById(req.params.id)
        .populate("species")
        .exec(function (err, results) {
            if (err) {
                return next(err)
            }
            res.render("speciesinstance_detail", {
                title: `${results.name}`,
                species_instance: results
            })
        })
}

// Display SpeciesInstance create form on GET.
exports.speciesinstance_create_get = (req, res, next) => {
    Species.find().exec(function (err, results) {
        if (err) {
            return next(err);
        }
        res.render("speciesinstance_form", {
            title: "Add new animal",
            species_list: results
        });
    });
};

// Handle SpeciesInstance create on POST.
exports.speciesinstance_create_post = [
    body("animal_name", "Please enter a name")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("animal_age", "Please enter age")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("animal_species", "Please select a species")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        const species_instance = new SpeciesInstance({
            species: req.body.animal_species,
            name: req.body.animal_name,
            age: req.body.animal_age
        });

        if (!errors.isEmpty()) {

            Species.find().exec(function (err, results) {
                if (err) {
                    return next(err);
                }

                res.render("speciesinstance_form", {
                    title: "Add new animal",
                    species_instance,
                    species_list: results,
                    errors: errors.array()
                });
            });
            return;
        }

        species_instance.save(err => {
            if (err) {
                return next(err);
            }

            res.redirect(species_instance.url);
        });
    }
];

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