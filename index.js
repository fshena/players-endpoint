const players = require('../handler/player-handler');
const validator = require('@localleague/middleware').validator;

const getPlayerDto = require('./src/dto/get-dto');

module.exports = (server) => {
    server.get(
        {path: '/players', name: 'getPlayers'},
        validator.query,
        validator.fields(getPlayerDto),
        players.get
    );
    server.get(
        {path: '/players/:id([0-9]+)', name: 'getPlayersById'},
        validator.query,
        validator.fields(getPlayerDto),
        players.getById
    );
    server.post(
        {path: '/players', name: 'postPlayers'},
        players.post
    );
    server.put(
        {path: '/players/:id([0-9]+)', name: 'putPlayers'},
        players.put
    );
    server.patch(
        {path: '/players/:id([0-9]+)', name: 'patchPlayers'},
        players.patch
    );
    server.del(
        {path: '/players/:id([0-9]+)', name: 'deletePlayers'},
        players.delete
    );
};




