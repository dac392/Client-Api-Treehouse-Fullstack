'use strict'

const {Model, Sequelize} = require('sequelize');
module.exports = (sequelize)=>{
    class User extends Model {}
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: '"firstName" field cannot be empty'},
                notNull: {msg: '"firstName" field is required'}
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: '"lastName" field cannot be empty'},
                notNull: {msg: '"lastName" field is required'}
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: 'The email you entered already exists'
            },
            validate: {
                isEmail: { msg: 'Please provide a valid email address'},
                notNull: {msg: '"emailAddress" field is required'}
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: '"password" field cannot be empty'},
                notNull: {msg: '"password" field is required'}
            }
        }
    }, {sequelize});
    User.associate = (models) =>{
        User.hasMany(models.Course, {
            as: 'user', // allias
            foreignKey: {
                fieldName: "userId",
                allowNull: false
            }
        })
    }
    
    return User;
}