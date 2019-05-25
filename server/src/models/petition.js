module.exports = (sequelize, DataTypes) => {
    const Petition = sequelize.define(
        'Petition',
        {
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                }
            },
            officeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Offices',
                    key: 'id',
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            evidence: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            }
        }, {}
    );

    Petition.associate = (models) => {
        // associations can be defined here
        Petition.belongsTo(models.User, {
            foreignKey: 'createdBy',
            as: 'user'
        });

        Petition.belongsTo(models.Office, {
            foreignKey: 'officeId',
            as: 'office'
        });
    };

    return Petition;
};
