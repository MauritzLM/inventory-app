const Genus = require("../models/genus");
const Species = require("../models/species");
const Family = require("../models/family");

const { body, validationResult } = require("express-validator");

const async = require("async");

// Display list of all Genus.
exports.genus_list = (req, res, next) => {
    Genus.find()
        .populate("family")
        .exec(function (err, results) {
            if (err) {
                return next(err);
            }
            res.render("genus_list", { title: "Genus list", genus_list: results })
        });
};

// Display detail page for a specific Genus.
exports.genus_detail = (req, res, next) => {
    async.parallel({
        genus: function (callback) {
            Genus.findById(req.params.id).exec(callback)
        },
        species_list: function (callback) {
            Species.find({ genus: req.params.id }).exec(callback)
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.render("genus_detail", {
            title: `${results.genus.name}`,
            genus: results.genus,
            species_list: results.species_list
        });
    }
    )
};

// Display Genus create form on GET.
exports.genus_create_get = (req, res, next) => {
    // get list of families
    Family.find().exec(function (err, results) {
        if (err) {
            return next(err)
        }
        res.render("genus_form", { title: "Create new genus", family_list: results });
    })
};

// Handle Genus create on POST.
exports.genus_create_post = [
    body("genus_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Genus name is required"),
    body("genus_family")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please select a family"),

    (req, res, next) => {
        const errors = validationResult(req);

        const genus = new Genus({ name: req.body.genus_name, family: req.body.genus_family })

        if (!errors.isEmpty()) {
            // get families
            Family.find().exec(function (err, results) {
                if (err) {
                    return next(err);
                }
                res.render("genus_form", {
                    title: "Create new genus",
                    genus,
                    family_list: results,
                    errors: errors.array()
                });
            });
            return
        }

        genus.save((err) => {
            if (err) {
                return next(err)
            }
            res.redirect(genus.url);
        })

    }
]

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
