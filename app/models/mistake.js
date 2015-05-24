"use strict";

module.exports = function(sequelize, DataTypes) {
    var Mistake = sequelize.define("Mistake", {
        word_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lang: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {}
    });

    return Mistake;
};
