const paginationLinks = require('@localleague/helpers').paginationLinks;
const HttpStatus = require('http-status-codes');

const maxLimit = require('../config/api-config').query.maxLimit;
const playerMySqlRepository = require('../repository/mysql/player-repository');
const errorHandler = require('./error-handler');
const getPlayerDto = require('../dto/get-dto');
const postPlayerDto = require('../dto/post-dto');
const putPlayerDto = require('../dto/put-dto');
const playerCollectionDto = require('../dto/collection-dto');

/**
 * Query database for using player id.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.getById = (req, res, next) => {
    const sendResponse = (player) => {
        const status = player ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        res.status(status);
        if (status === HttpStatus.NOT_FOUND) {
            return res.json();
        }
        res.json(getPlayerDto.map(player));
    };
    playerMySqlRepository
        .getPlayerById({playerId: req.params.id, fields: req.params.fields})
        .then(sendResponse)
        .catch(errors => errorHandler.model(errors, next))
};

/**
 * Get all player form the database.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.get = (req, res, next) => {
    const sendResponse = (players) => {
        res.set({
            'Link': paginationLinks(req, players.count, maxLimit),
            'X-Total-Count': players.count,
        });
        res.status(HttpStatus.OK);
        res.json(playerCollectionDto(players.rows));
    };
    playerMySqlRepository
        .getAllPlayers(req)
        .then(sendResponse)
        .catch(errors => errorHandler.model(errors, next))
};

/**
 * Save players in the database.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.post = (req, res, next) => {
    const sendResponse = (player, created) => {
        const createdPlayer = player.get({plain: true});
        let status = HttpStatus.CREATED;
        // If no new player was created because it already exists.
        if (!created && createdPlayer) {
            status = HttpStatus.NOT_MODIFIED;
        }
        // The link where to find the new player or the existing one.
        res.header('Content-Location', req.route.path + '/' + createdPlayer.id);
        res.status(status);
        res.json(getPlayerDto.map(createdPlayer));
    };
    playerMySqlRepository
        .createPlayer(postPlayerDto(req.body))
        .spread(sendResponse)
        .catch((errors) => errorHandler.model(errors, next));
};

/**
 * Update players data.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.put = (req, res, next) => {
    const sendResponse = (updated) => {
        let status = updated[0] > 0
            ? HttpStatus.NO_CONTENT
            : HttpStatus.NOT_FOUND;
        res.status(status);
        res.json();
    };
    playerMySqlRepository
        .updatePlayer(req.params.id, putPlayerDto(req.body))
        .then(sendResponse)
        .catch((errors) => errorHandler.model(errors, next));
};

/**
 * Delete player from the database.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.delete = (req, res, next) => {
    const sendResponse = (deleted) => {
        // Send different status if record for deletion exists or not.
        let status = deleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;
        res.status(status);
        res.json();
    };
    playerMySqlRepository
        .deletePlayer(req.params.id)
        .then(sendResponse)
        .catch(errors => errorHandler.model(errors, next));
};

/**
 * Update specific player fields.
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
exports.patch = (req, res, next) => {
    // Find player with the specific id.
    const sendResponse = (updated) => {
        let status = updated ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;
        res.status(status);
        res.json();
    };
    playerMySqlRepository
        .patchPlayer(req.params.id, req.body)
        .then(sendResponse)
        .catch(errors => errorHandler.model(errors, next));
};
