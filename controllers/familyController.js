const Family = require("../models/family");
const Genus = require("../models/genus");

const { body, validationResult } = require("express-validator");

const async = require("async");

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
exports.family_detail = (req, res, next) => {
    async.parallel({
        family: function (callback) {
            Family.findById(req.params.id).exec(callback)
        },
        genus_list: function (callback) {
            Genus.find({ family: req.params.id }).exec(callback)
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.render("family_detail", {
            title: `${results.family.name}`,
            family: results.family,
            genus_list: results.genus_list
        });
    }
    )
};

// Display Family create form on GET.
exports.family_create_get = (req, res) => {
    res.render("family_form", { title: "Create Family" });
};

// Handle Family create on POST.
exports.family_create_post = [
    // validate and sanitize data
    body("family_name")
        .trim().
        isLength({ min: 1 })
        .escape()
        .withMessage("Family name is required"),
    body("family_description")
        .trim()
        .isLength({ min: 10 })
        .escape()
        .withMessage("Family description must be more than 10 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        // if there are errors
        if (!errors.isEmpty()) {
            res.render("family_form", {
                title: "Create Family",
                family: req.body,
                errors: errors.array()
            })
            return;
        }
        // data is valid
        else {
            Family.findOne({ name: req.body.family_name }).exec(function (err, found_family) {
                if (err) {
                    return next(err);
                }
                if (found_family) {
                    res.redirect(found_family.url);
                } else {
                    const family = new Family({ name: req.body.family_name, description: req.body.family_description });
                    // save new family
                    family.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect(family.url);
                    });
                }
            })
        }
    }
];

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
