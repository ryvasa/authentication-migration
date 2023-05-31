const Schedule = require("../models").Schedule;
const User = require("../models").User;
const Booking = require("../models").Booking;

exports.addBooking = async (req, res) => {
  try {
    const id = req.userId;
    const { scheduleId, price } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      const response = {
        status_response: false,
        message: "User not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    if (user.role !== 1) {
      const response = {
        status_response: false,
        message: "Only User can order",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    const booking = await Booking.create({
      UserId: id,
      ScheduleId: scheduleId,
      price,
    });
    const response = {
      status_response: true,
      message: "Data booking created",
      errors: null,
      data: booking,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};

exports.findAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    const response = {
      status_response: true,
      message: `${bookings.length} bookings data`,
      errors: null,
      data: bookings,
    };
    res.status(400).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};

exports.findOneBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findOne({
      where: { id },
    });
    if (!booking) {
      const response = {
        status_response: false,
        message: "Booking not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    const response = {
      status_response: true,
      message: `Found booking data`,
      errors: null,
      data: booking,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduleId, price } = req.body;

    const booking = await Booking.findOne({
      where: { id },
    });
    if (!booking) {
      const response = {
        status_response: false,
        message: "Booking not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    booking.set({
      ScheduleId: scheduleId || booking.ScheduleId,
      price: price || booking.price,
    });
    await booking.save();

    const response = {
      status_response: true,
      message: "Found booking data",
      errors: null,
      data: booking,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({
      where: { id },
    });
    if (!booking) {
      const response = {
        status_response: false,
        message: "Booking not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    await Booking.destroy({
      where: { id },
    });
    const response = {
      status_response: true,
      message: "Data booking has been deleted",
      errors: null,
      data: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};
