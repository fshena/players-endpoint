const { db }      = require('@localleague/database');
const userModel   = require('@localleague/users-endpoint/src/models/user-model');
const playerModel = require('./player-model');

const models = [
    playerModel
];

if (userModel) {
    models.push(userModel);
}

module.exports = db.loadModels(models);
