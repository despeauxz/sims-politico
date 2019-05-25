module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define(
        'Vote',
        {
            officeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                // onDelete: 'CASCADE',
                // references: {
                //     model: 'Offices',
                //     key: 'id',
                // }
            },
            candidateId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                // onDelete: 'CASCADE',
                // references: {
                //     model: 'Candidates',
                //     key: 'id',
                // }
            },
            voterId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                // onDelete: 'CASCADE',
                // references: {
                //     model: 'Users',
                //     key: 'id',
                // }
            }
        }, {}
    );

    Vote.associate = (models) => {
        // associations can be defined here

        // Vote.belongsTo(models.User, {
        //     through: {
        //         foreignKey: 'voterId',
        //         as: 'user',
        //     },
        //     as: 'voter'
        // });

        // Vote.belongsTo(models.Candidate, {
        //     foreignKey: 'candidateId',
        //     as: 'candidate'
        // });

    //     Vote.belongsTo(models.Office, {
    //         foreignKey: 'officeId',
    //         as: 'office'
    //     });
    };

    return Vote;
};
