const objMapper = require('object-mapper');

/**
 * The Player json structure needed for storing a new entry.
 * @param {Object} player
 * @return {*}
 */
module.exports = (player) => {
    const src = {
        'username': 'username',
        'firstName': 'first_name',
        'lastName': 'last_name',
        'email': 'email',
        'avatar': 'avatar',
        'roleId': 'role_id',
        'isActive': 'is_active',
        'birthday': 'birthday',
        'height': 'height',
        'weight': 'weight',
    };
    return objMapper(player, src);
};
