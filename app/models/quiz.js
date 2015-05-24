"use strict";

module.exports = function(sequelize, DataTypes) {
    var Quiz = sequelize.define("Quiz", {
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Quiz.belongsTo(models.User);
            }
        }
    });

    return Quiz;
};
