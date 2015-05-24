"use strict";

module.exports = function(sequelize, DataTypes) {
    var Word = sequelize.define("Word", {
        en: DataTypes.STRING,
        ru: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Word.hasMany(models.Quiz);
            }
        }
    });

    return Word;
};
