/* eslint-disable radix */
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const SALT_ROUNDS = parseInt(process.env.SALT);

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            othername: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'https://www.tannerfinancial.ca/wp-content/uploads/2019/01/person-placeholder-male-5-1-300x300-250x250.jpg'
            },
            phoneNo: {
                type: DataTypes.BIGINT,
                allowNull: true,
                defaultValue: null,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            partyId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            passwordResetToken: {
                type: DataTypes.STRING,
                allowNull: true
            },
            passwordTokenExpiry: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
        }, {
            hooks: {
                beforeCreate: user => User.hashPassword(user),
                beforeUpdate: user => User.hashPassword(user)
            }
        }
    );

    User.associate = (models) => {
        // associations can be defined here
        User.hasMany(models.Petition, {
            foreignKey: 'id',
            as: 'petition'
        });

        User.hasMany(models.Candidate, {
            foreignKey: 'id',
            as: 'user'
        });

        User.hasMany(models.Vote, {
            foreignKey: 'id',
            as: 'vote'
        });
    };

    User.hashPassword = async (user) => {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
        await user.setDataValue('password', hash);
    };

    return User;
};
