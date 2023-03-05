const Genus = require("../models/genus");
const Species = require("../models/species");

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
            Genus.findById(req.params.id)
                .populate("family")
                .exec(callback)
        },
        species_list: function (callback) {
            Species.find({ genus: req.params.id }).exec(callback)
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.genus == null) {
            // No results.
            const err = new Error("Genus not found");
            err.status = 404;
            return next(err);
        }
        // genus found
        res.render("genus_detail", {
            title: `${results.genus.name}`,
            genus: results.genus,
            species_list: results.species_list
        });
    }
    )
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
