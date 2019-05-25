module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define(
        'Office',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            type: {
                type: DataTypes.ENUM,
                values: ['federal', 'legislative', 'state', 'local'],
                allowNull: false,
            },
            electionDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                defaultValue: null
            }
        }, {
            hooks: {
                beforeUpdate: office => Office.updatedValue(office)
            }
        }
    );

    Office.associate = (models) => {
        // associations can be defined here
        Office.hasMany(models.Candidate, {
            foreignKey: 'id',
            as: 'candidate'
        });

        Office.hasMany(models.Petition, {
            foreignKey: 'id',
            as: 'petition'
        });

        Office.hasMany(models.Vote, {
            foreignKey: 'id',
            as: 'vote'
        });
    };

    Office.updatedValue = async (office) => {
        await office.setDataValue('name', office);
    };

    return Office;
};
