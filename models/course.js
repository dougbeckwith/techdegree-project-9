"use strict";
const User = require("./user");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Course"
    }
  );
  Course.associate = function (models) {
    Course.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Course;
};
