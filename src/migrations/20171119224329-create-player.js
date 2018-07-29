
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('player', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            unique: true,
        },
        username: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
        birthday: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            defaultValue: null,
        },
        height: {
            type: Sequelize.INTEGER(3),
            allowNull: true,
            defaultValue: null,
        },
        weight: {
            type: Sequelize.INTEGER(3),
            allowNull: true,
            defaultValue: null,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: queryInterface => queryInterface.dropTable('player'),
};
