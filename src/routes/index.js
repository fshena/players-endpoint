const { validator } = require('@localleague/middleware');

const getPlayerDto  = require('../dto/get-dto');
const players       = require('../handler/player-handler');

module.exports = (server) => {
    server.get(
        { path: '/players', name: 'getPlayers' },
        validator.query,
        validator.fields(getPlayerDto),
        players.get
    );
    server.get(
        { path: '/players/:id([0-9]+)', name: 'getPlayersById' },
        validator.query,
        validator.fields(getPlayerDto),
        players.getById
    );
    server.post(
        { path: '/players', name: 'postPlayers' },
        players.post
    );
    server.put(
        { path: '/players/:id([0-9]+)', name: 'putPlayers' },
        players.put
    );
    server.del(
        { path: '/players/:id([0-9]+)', name: 'deletePlayers' },
        players.delete
    );
    server.get(
        { path: '/players/swagger.json', name: 'docsPlayers' },
        players.docs
    );
};
