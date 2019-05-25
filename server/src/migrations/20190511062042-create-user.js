module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        othername: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'https://www.tannerfinancial.ca/wp-content/uploads/2019/01/person-placeholder-male-5-1-300x300-250x250.jpg'
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        partyId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        passwordResetToken: {
            type: Sequelize.STRING,
            allowNull: true
        },
        passwordTokenExpiry: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }),
    down: queryInterface => queryInterface.dropTable('Users')
};
