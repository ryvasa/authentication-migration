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
    const buses_data = [
      {
        name: "Budiman",
        capacity: 59,
        number_plate: "B 7890 LM",
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        name: "Karunia Bakti",
        capacity: 59,
        number_plate: "D 4560 JK",
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        name: "Kurangtau",
        capacity: 39,
        number_plate: "Z 1230 EF",
        createdAt: datetime,
        updatedAt: datetime,
      },
    ];

    await queryInterface.bulkInsert("Buses", buses_data);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Buses", null, {});
  },
};
