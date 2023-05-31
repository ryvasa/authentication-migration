"use strict";
const date = new Date();

const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);
const hours = ("0" + date.getHours()).slice(-2);
const minutes = ("0" + date.getMinutes()).slice(-2);
const seconds = ("0" + date.getSeconds()).slice(-2);

const datetime =
  year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const schedules_data = [
      {
        RouteId: 1,
        BusId: 1,
        DriverId: 2,
        travel_date: "2023-10-24",
        departure_time: "07:15:00",
        arrival_time: "12:30:00",
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        RouteId: 2,
        BusId: 2,
        DriverId: 2,
        travel_date: "2025-11-20",
        departure_time: "09:45:00",
        arrival_time: "16:30:00",
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        RouteId: 3,
        BusId: 3,
        DriverId: 4,
        travel_date: "2023-12-11",
        departure_time: "10:00:00",
        arrival_time: "22:30:00",
        createdAt: datetime,
        updatedAt: datetime,
      },
    ];

    await queryInterface.bulkInsert("Schedules", schedules_data);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Schedules", null, {});
  },
};
