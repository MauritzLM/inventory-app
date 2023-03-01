#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Species = require('./models/species');
const Family = require('./models/family');
const Genus = require('./models/genus');
const SpeciesInstance = require('./models/speciesinstance');


const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const families = [];
const genuses = [];
const speciesArr = [];
const speciesinstances = [];

// family create
function familyCreate(name, description, cb) {
    const familydetail = { name: name, description: description }

    const family = new Family(familydetail);

    family.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Family: ' + family);
        families.push(family)
        cb(null, family);
    });
};

// genus create
function genusCreate(name, family, cb) {
    const genus = new Genus({
        name: name,
        family: family
    });

    genus.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Genus: ' + genus);
        genuses.push(genus)
        cb(null, genus);
    });
};

// species create
function speciesCreate(common_name, scientific_name, description, family, population_in_zoo, genus, cb) {
    const speciesdetail = {
        common_name: common_name,
        scientific_name: scientific_name,
        description: description,
        family: family,
        population_in_zoo: population_in_zoo,
        genus: genus,
    }
    if (genus != false) speciesdetail.genus = genus;

    const species = new Species(speciesdetail);
    species.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Species: ' + species);
        speciesArr.push(species);
        cb(null, species);
    });
};

// species instance create
function speciesInstanceCreate(species, name, age, cb) {
    const speciesinstancedetail = {
        species: species,
        name: name,
        age: age
    }

    const speciesinstance = new SpeciesInstance(speciesinstancedetail);
    speciesinstance.save(function (err) {
        if (err) {
            console.log('ERROR CREATING SpeciesInstance: ' + speciesinstance);
            cb(err, null)
            return
        }
        console.log('New SpeciesInstance: ' + speciesinstance);
        speciesinstances.push(speciesinstance)
        cb(null, species)
    });
}

function createFamilies(cb) {
    async.series([
        function (callback) {
            familyCreate('Felidae', 'Family of mammals in the order Canivora colloquially referred to as cats', callback);
        },
        function (callback) {
            familyCreate('Crocodylidae', 'Crocodiles are large semiaquatic reptiles that live throughout the tropics in Africa, Asia, the Americas and Australia.', callback);
        },
        function (callback) {
            familyCreate('Bovidae', 'The Bovidae comprise the biological family of cloven-hoofed, ruminant mammals that includes cattle, bison, buffalo, antelopes, and caprines.', callback);
        },
        function (callback) {
            familyCreate('Canidae', 'Canidae is a biological family of dog-like carnivorans, colloquially referred to as dogs.', callback);
        },
        function (callback) {
            familyCreate('Gruidae', 'Cranes are a family of large, long-legged, and long-necked birds', callback);
        },
    ],
        // optional callback
        cb);
};

function createGenus(cb) {
    async.parallel([
        function (callback) {
            genusCreate('Grus', families[4], callback)
        },
        function (callback) {
            genusCreate('Panthera', families[0], callback)
        },
        function (callback) {
            genusCreate('Cocodylus', families[1], callback)
        },
        function (callback) {
            genusCreate('Bison', families[2], callback)
        },
        function (callback) {
            genusCreate('Otocyon', families[3], callback)
        }
    ], cb);
};

function createSpecies(cb) {
    async.parallel([
        function (callback) {
            speciesCreate('Blue crane', 'Grus paradisea', 'The blue crane is a tall, ground-dwelling bird, but is fairly small by the standards of the crane family', families[4], 0, genuses[0], callback)
        },
        function (callback) {
            speciesCreate('Leopard', 'Panthera Pardus', ' A member of the cat family. Compared to other wild cats, the leopard has relatively short legs and a long body with a large skull. Its fur is marked with rosettes.', families[0], 0, genuses[1], callback)
        },
        function (callback) {
            speciesCreate('Nile crocodile', 'Crocodylus niloticus', 'The Nile crocodile is a large crocodilian native to freshwater habitats in Africa, it lives in different types of aquatic environments such as lakes, rivers, swamps, and marshlands.', families[1], 0, genuses[2], callback)
        },
        function (callback) {
            speciesCreate('American bison', 'Bison bison', 'The American bison is a species of bison native to North America. Sometimes colloquially referred to as American buffalo', families[2], 0, genuses[3], callback)
        },
        function (callback) {
            speciesCreate('Bat-eared fox', 'Otocyon megalotis', 'The bat-eared fox is a species of fox found on the African savanna. It is named for its large ears, which have a role in thermoregulation', families[3], 0, genuses[4], callback)
        }
    ], cb);
};

function createSpeciesInstances(cb) {
    async.parallel([
        function (callback) {
            speciesInstanceCreate(speciesArr[0], 'Ben', 5, callback)
        },
        function (callback) {
            speciesInstanceCreate(speciesArr[1], 'Kiara', 4, callback)
        },
        function (callback) {
            speciesInstanceCreate(speciesArr[2], 'Tiny', 30, callback)
        },
        function (callback) {
            speciesInstanceCreate(speciesArr[1], 'Razer', 6, callback)
        },
        function (callback) {
            speciesInstanceCreate(speciesArr[2], 'Grumpy', 21, callback)
        },
        function (callback) {
            speciesInstanceCreate(speciesArr[4], 'Troy', 3, callback)
        },
        function (callback) {
            speciesInstanceCreate(speciesArr[4], 'Felix', 3, callback)
        },
        function (callback) {
            speciesInstanceCreate(speciesArr[4], 'Sandy', 3, callback)
        },
    ], cb);
};

async.series([
    createFamilies,
    createGenus,
    createSpecies,
    createSpeciesInstances
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Speciesinstances: ' + speciesinstances);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });