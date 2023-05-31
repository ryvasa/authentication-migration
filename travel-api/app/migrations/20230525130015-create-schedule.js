"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Schedules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      RouteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      BusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      DriverId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      travel_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      departure_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      arrival_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Schedules", {
      fields: ["BusId"],
      type: "foreign key",
      name: "fk_bus_id",
      references: {
        table: "Buses",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Schedules", {
      fields: ["DriverId"],
      type: "foreign key",
      name: "fk_driver_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Schedules", {
      fields: ["RouteId"],
      type: "foreign key",
      name: "fk_route_id",
      references: {
        table: "Routes",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Schedules", "fk_bus_id");
    await queryInterface.removeConstraint("Schedules", "fk_driver_id");
    await queryInterface.removeConstraint("Schedules", "fk_route_id");
    await queryInterface.dropTable("Schedules");
  },
};
