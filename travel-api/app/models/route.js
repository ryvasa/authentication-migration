"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Route.hasMany(models.Schedule, {
        foreignKey: "RouteId",
      });
    }
  }
  Route.init(
    {
      name: DataTypes.STRING,
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      distance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Route",
    }
  );
  return Route;
};
