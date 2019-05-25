module.exports = (sequelize, DataTypes) => {
    const Party = sequelize.define(
        'Party',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            hqAddress: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            logoUrl: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'https://www.tannerfinancial.ca/wp-content/uploads/2019/01/person-placeholder-male-5-1-300x300-250x250.jpg'
            }
        }, {}
    );

    Party.associate = (models) => {
        Party.hasMany(models.Candidate, {
            foreignKey: 'id',
            as: 'party'
        });
    };

    return Party;
};
