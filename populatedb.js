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
    familydetail = { name: name, description: description }

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
function genusCreate(name, cb) {
    const genus = new Genus({ name: name });

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
    speciesdetail = {
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
    speciesinstancedetail = {
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
            authorCreate('Gruidae', 'Cranes are a family of large, long-legged, and long-necked birds', callback);
        },
    ],
        // optional callback
        cb);
}