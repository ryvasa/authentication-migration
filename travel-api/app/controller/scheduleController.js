const Schedule = require("../models").Schedule;
const User = require("../models").User;
const Route = require("../models").Route;
const Bus = require("../models").Bus;

exports.findAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        { model: User, attributes: ["id", "email", "name", "role"] },
        { model: Bus, attributes: ["id", "name", "number_plate", "capacity"] },
        {
          model: Route,
          attributes: ["id", "name", "origin", "destination", "distance"],
        },
      ],
    });
    const response = {
      status_response: true,
      message: schedules.length + " schedules data",
      errors: null,
      data: schedules,
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

exports.addSchedule = async (req, res) => {
  try {
    const { routeId, busId, driverId, travelDate, departureTime, arrivalTime } =
      req.body;
    const user = await User.findOne({ where: { id: driverId } });
    if (!user) {
      const response = {
        status_response: false,
        message: "Driver not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    if (user.role !== 2) {
      const response = {
        status_response: false,
        message: "The user is not allowed to drive",
        errors: "Error, Only Driver can Drive",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    const schedule = await Schedule.create({
      RouteId: routeId,
      BusId: busId,
      DriverId: driverId,
      travel_date: travelDate,
      departure_time: departureTime,
      arrival_time: arrivalTime,
    });
    const response = {
      status_response: true,
      message: "Data schedule created",
      errors: null,
      data: schedule,
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

exports.findOneSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findOne({
      where: { id },
    });
    if (!schedule) {
      const response = {
        status_response: false,
        message: "Schedule not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    const response = {
      status_response: true,
      message: `Found ${schedule.length} schedule data`,
      errors: null,
      data: schedule,
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

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { routeId, busId, driverId, travelDate, departureTime, arrivalTime } =
      req.body;
    const schedule = await Schedule.findOne({
      where: { id },
    });
    if (!schedule) {
      const response = {
        status_response: false,
        message: "Schedule not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    const user = await User.findOne({ where: { id: driverId } });
    if (!user) {
      const response = {
        status_response: false,
        message: "Driver not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    if (user.role !== 2) {
      const response = {
        status_response: false,
        message: "The user is not allowed to drive",
        errors: "Error, Only Driver can Drive",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    schedule.set({
      RouteId: routeId || schedule.RouteId,
      BusId: busId || schedule.BusId,
      DriverId: driverId || schedule.DriverId,
      travel_date: travelDate || schedule.travel_date,
      departure_time: departureTime || schedule.departure_time,
      arrival_time: arrivalTime || schedule.arrival_time,
    });
    await schedule.save();

    const response = {
      status_response: true,
      message: "Found schedule data",
      errors: null,
      data: schedule,
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

exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findOne({
      where: { id },
    });
    if (!schedule) {
      const response = {
        status_response: false,
        message: "Schedule not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    await Schedule.destroy({
      where: { id },
    });
    const response = {
      status_response: true,
      message: "Data schedule has been deleted",
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
