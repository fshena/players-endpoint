const objMapper = require('object-mapper');
const extract = require('extract');
const objHelper = require('@localleague/helpers').object;

const mapping = {
    user: {
        'id': 'id',
        'username': 'username',
        'first_name': 'firstName',
        'last_name': 'lastName',
        'email': 'email',
        'avatar': 'avatar',
        'role_id': 'roleId',
        'is_active': 'isActive',
    },
    player: {
        'birthday': 'birthday',
        'height': 'height',
        'weight': 'weight',
    },
    merged: {
        'User.id': 'id',
        'User.username': 'username',
        'User.first_name': 'firstName',
        'User.last_name': 'lastName',
        'User.email': 'email',
        'User.avatar': 'avatar',
        'User.role_id': 'roleId',
        'User.is_active': 'isActive',
        'birthday': 'birthday',
        'height': 'height',
        'weight': 'weight',
    }
};

module.exports = {
    getMap: (key) => {
        if (key) {
            return mapping[key];
        }
        return mapping.merged;
    },

    /**
     * The Player json structure that will be returned in the response.
     * @param {Object} player
     * @param {Boolean} reverse
     * @return {*}
     */
    map: (player, reverse) => {
        player = player.get({plain: true});
        return objMapper(player, mapping.merged);
    }
};
