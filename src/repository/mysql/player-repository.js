const models = require('@localleague/database');
const objHelper = require('@localleague/helpers').object;

const Op = require('sequelize').Op;

const apiConfig = require('../../config/api-config');
const getPlayerDto = require('../../dto/get-dto');

/**
 * Get specific player entry.
 * @param {{leagueId:numeric, fields:array}} payload
 * @return {Promise<Array<Model>>}
 */
exports.getPlayerById = payload => {
    let sqlQuery = {
        where: {
            [Op.and]: {
                id: payload.playerId,
            },
        },
        raw: true
    };
    if (payload.fields) {
        sqlQuery.attributes = objHelper.getDbFieldsNames(
            getPlayerDto.getMap(),
            payload.fields.split(',')
        );
    }
    return models.Player.findOne(sqlQuery);
};

/**
 * Get all players.
 * @param {Object} req
 * @return {Promise<Array<Model>>}
 */
exports.getAllPlayers = (req) => {
    let limit = parseInt(req.query.limit) || apiConfig.query.maxLimit;
    let sqlQuery = {
        limit: limit,
        offset: parseInt(req.query.offset) * limit || 0,
        order: [
            [
                req.query.sort || models.User.attributes.username,
                req.query.order || 'ASC',
            ],
        ],
        include: [
            {
                model: models.User,
                required: true
            },
        ],
        // raw: true,
    };
    // since the player's attributes are held on the 'user' and 'player' table,
    // we need to request the fields from separate models.
    if (req.params.fields) {
        // get the players' fields that can be included in the request
        const userFieldsInclude = objHelper.getDbFieldsNames(
            getPlayerDto.getMap('player'),
            req.params.fields.split(',')
        );
        if (userFieldsInclude) {
            sqlQuery.attributes = userFieldsInclude;
        }
        // get the users' fields that can be included in the request
        const playerFieldsInclude = objHelper.getDbFieldsNames(
            getPlayerDto.getMap('user'),
            req.params.fields.split(',')
        );
        if (playerFieldsInclude) {
            sqlQuery.include[0].attributes = playerFieldsInclude;
        }
    }
    return models.Player.findAndCountAll(sqlQuery);
};

/**
 * Create new player entry if the player doesn't already exist.
 * @param {Object} newPlayer
 * @return {Promise<Model, created>}
 */
exports.createPlayer = (newPlayer) => {
    const conditions = {
        where: {
            [Op.and]: {
                email: newPlayer.email,
            },
        },
        defaults: newPlayer,
    };
    return models.Player.findOrCreate(conditions);
};

/**
 * Update player entry.
 * @param {integer} id
 * @param {Object} updatePlayer
 * @return {Promise}
 */
exports.updatePlayer = (id, updatePlayer) => {
    const conditions = {
        where: {
            [Op.and]: {
                id: id,
            },
        },
    };
    return models.Player.update(updatePlayer, conditions);
};

/**
 * Delete specific player entry.
 * @param {integer} id
 * @return {Promise}
 */
exports.deletePlayer = (id) => {
    const conditions = {
        where: {
            [Op.and]: {
                id: id,
            },
        },
    };
    return models.Player.destroy(conditions);
};

/**
 * Update specific fields of a player entry.
 * @param {integer} id
 * @param {Object} data
 * @return {Promise}
 */
exports.patchPlayer = (id, data) => {
    let attributes = {};
    attributes[data.path] = data.value;
    const conditions = {
        where: {
            [Op.and]: {
                id: id,
            },
        },
    };
    return models.Player.update(attributes, conditions);
};
