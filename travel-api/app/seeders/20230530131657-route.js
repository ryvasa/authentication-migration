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
    const routes_data = [
      {
        name: "BDG-TSM",
        origin: "BANDUNG",
        destination: "TASIKMALAYA",
        distance: 116,
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        name: "TSM-JKT",
        origin: "TASIKMALAYA",
        destination: "JAKARTA",
        distance: 210,
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        name: "JKT-BDG",
        origin: "JAKARTA",
        destination: "BANDUNG",
        distance: 150,
        createdAt: datetime,
        updatedAt: datetime,
      },
    ];

    await queryInterface.bulkInsert("Routes", routes_data);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Routes", null, {});
  },
};
