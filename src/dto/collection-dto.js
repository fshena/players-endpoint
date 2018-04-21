const getPlayerDto = require('./get-dto');

/**
 * The Player entity collection structure that
 * will be returned in the response.
 * @param {Object[]} players
 * @return {*}
 */
module.exports = (players) => {
    players.forEach((player, index) => {
        players[index] = getPlayerDto.map(player);
    });
    return players;
};
