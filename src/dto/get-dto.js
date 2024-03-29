const objMapper = require('object-mapper');

const mapping = {
    user: {
        id: 'id',
        first_name: 'firstName',
        last_name: 'lastName',
        email: 'email',
        avatar: 'avatar',
        role_id: 'roleId',
        is_active: 'isActive',
    },
    player: {
        username: 'username',
        birthday: 'birthday',
        height: 'height',
        weight: 'weight',
    },
    merged: {
        'User.id': 'id',
        'User.first_name': 'firstName',
        'User.last_name': 'lastName',
        'User.email': 'email',
        'User.avatar': 'avatar',
        'User.role_id': 'roleId',
        'User.is_active': 'isActive',
        username: 'username',
        birthday: 'birthday',
        height: 'height',
        weight: 'weight',
    },
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
     * @return {*}
     */
    map: player => objMapper(player, mapping.merged),
};
