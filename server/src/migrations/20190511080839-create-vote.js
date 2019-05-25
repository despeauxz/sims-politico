module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        officeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            onDelete: 'CASCADE',
            // primaryKey: true,
            references: {
                model: 'Offices',
                key: 'id',
            }
        },
        candidateId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Candidates',
                key: 'id',
            }
        },
        voterId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            // primaryKey: true,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
            }
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
    down: queryInterface => queryInterface.dropTable('Votes')
};
