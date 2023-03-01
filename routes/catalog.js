const express = require("express");
const router = express.Router();

// Require controller modules.
const species_controller = require("../controllers/speciesController");
const family_controller = require("../controllers/familyController");
const genus_controller = require("../controllers/genusController");
const species_instance_controller = require("../controllers/speciesinstanceController");

/// SPECIES ROUTES ///

// GET catalog home page.
router.get("/", species_controller.index);

// GET request for creating a Species. NOTE This must come before routes that display Species (uses id).
router.get("/species/create", species_controller.species_create_get);

// POST request for creating Species.
router.post("/species/create", species_controller.species_create_post);

// GET request to delete Species.
router.get("/species/:id/delete", species_controller.species_delete_get);

// POST request to delete Species.
router.post("/species/:id/delete", species_controller.species_delete_post);

// GET request to update Species.
router.get("/species/:id/update", species_controller.species_update_get);

// POST request to update Species.
router.post("/species/:id/update", species_controller.species_update_post);

// GET request for one Species.
router.get("/species/:id", species_controller.species_detail);

// GET request for list of all Species items.
router.get("/species", species_controller.species_list);

/// FAMILY ROUTES ///

// GET request for creatingFamily. NOTE This must come before route for id (i.e. display family).
router.get("/family/create", family_controller.family_create_get);

// POST request for creatingFamily.
router.post("/family/create", family_controller.family_create_post);

// GET request to deleteFamily.
router.get("/family/:id/delete", family_controller.family_delete_get);

// POST request to deleteFamily.
router.post("/family/:id/delete", family_controller.family_delete_post);

// GET request to updateFamily.
router.get("/family/:id/update", family_controller.family_update_get);

// POST request to updateFamily.
router.post("/family/:id/update", family_controller.family_update_post);

// GET request for oneFamily.
router.get("/family/:id", family_controller.family_detail);

// GET request for list of all Family.
router.get("/family", family_controller.families_list);

/// GENUS ROUTES ///

// GET request for creating a Genus. NOTE This must come before route that displays Genus (uses id).
router.get("/genus/create", genus_controller.genus_create_get);

//POST request for creating Genus.
router.post("/genus/create", genus_controller.genus_create_post);

// GET request to delete Genus.
router.get("/genus/:id/delete", genus_controller.genus_delete_get);

// POST request to delete Genus.
router.post("/genus/:id/delete", genus_controller.genus_delete_post);

// GET request to update Genus.
router.get("/genus/:id/update", genus_controller.genus_update_get);

// POST request to update Genus.
router.post("/genus/:id/update", genus_controller.genus_update_post);

// GET request for one Genus.
router.get("/genus/:id", genus_controller.genus_detail);

// GET request for list of all Genus.
router.get("/genus", genus_controller.genus_list);

/// SPECIESINSTANCE ROUTES ///

// GET request for creating a SpeciesInstance. NOTE This must come before route that displays SpeciesInstance (uses id).
router.get(
    "/speciesinstance/create",
    species_instance_controller.speciesinstance_create_get
);

// POST request for creating SpeciesInstance.
router.post(
    "/speciesinstance/create",
    species_instance_controller.speciesinstance_create_post
);

// GET request to delete SpeciesInstance.
router.get(
    "/speciesinstance/:id/delete",
    species_instance_controller.speciesinstance_delete_get
);

// POST request to delete SpeciesInstance.
router.post(
    "/speciesinstance/:id/delete",
    species_instance_controller.speciesinstance_delete_post
);

// GET request to update SpeciesInstance.
router.get(
    "/speciesinstance/:id/update",
    species_instance_controller.speciesinstance_update_get
);

// POST request to update SpeciesInstance.
router.post(
    "/speciesinstance/:id/update",
    species_instance_controller.speciesinstance_update_post
);

// GET request for one SpeciesInstance.
router.get("/speciesinstance/:id", species_instance_controller.speciesinstance_detail);

// GET request for list of all SpeciesInstance.
router.get("/speciesinstances", species_instance_controller.speciesinstance_list);

module.exports = router;
