"use strict";
// Membuat objek Date untuk tanggal dan waktu saat ini
var date = new Date();

// Mendapatkan nilai tahun, bulan, tanggal, jam, menit, dan detik dari objek Date
var year = date.getFullYear();
var month = ("0" + (date.getMonth() + 1)).slice(-2);
var day = ("0" + date.getDate()).slice(-2);
var hours = ("0" + date.getHours()).slice(-2);
var minutes = ("0" + date.getMinutes()).slice(-2);
var seconds = ("0" + date.getSeconds()).slice(-2);

// Membentuk string dengan format yang sama dengan DATETIME di MySQL
var datetime =
  year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles_data = [
      {
        id: 1,
        name: "USER",
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        id: 2,
        name: "ADMIN",
        createdAt: datetime,
        updatedAt: datetime,
      },
      {
        id: 3,
        name: "PM",
        createdAt: datetime,
        updatedAt: datetime,
      },
    ];

    await queryInterface.bulkInsert("Roles", roles_data);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
