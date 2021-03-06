"use strict";

module.exports = function(sequelize, DataTypes) {
    var Word = sequelize.define("Word", {
        en: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {}
    });

    return Word;
};
