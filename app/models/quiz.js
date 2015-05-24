"use strict";

module.exports = function(sequelize, DataTypes) {
    var Quiz = sequelize.define("Quiz", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                Quiz.belongsTo(models.User);
            }
        }
    });

    return Quiz;
};
