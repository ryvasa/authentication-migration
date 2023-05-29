const Bus = require("../models").Bus;

exports.findAllBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    const response = {
      status_response: true,
      message: buses.length + " buses data",
      data: buses,
      errors: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};
