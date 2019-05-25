module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define(
        'Candidate',
        {
            confirm: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            partyId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Parties',
                    key: 'id',
                }
            },
            officeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                primaryKey: true,
                references: {
                    model: 'Offices',
                    key: 'id',
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                primaryKey: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            }
        }
    );

    Candidate.associate = (models) => {
        // associations can be defined here

        // Candidate.belongsTo(models.User, {
        //     foreignKey: 'userId',
        //     as: 'user'
        // });

        // Candidate.belongsTo(models.Party, {
        //     foreignKey: 'partyId',
        //     as: 'party'
        // });

        // Candidate.belongsTo(models.Office, {
        //     foreignKey: 'officeId',
        //     as: 'office'
        // });

        Candidate.hasMany(models.Vote, {
            foreignKey: 'candidateId',
            as: 'votes',
            timestamp: false
        });
    };

    return Candidate;
};
