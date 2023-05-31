const Route = require("../models").Route;

exports.findAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll();
    const response = {
      status_response: true,
      message: routes.length + " routes data",
      errors: null,
      data: routes,
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

exports.addRoute = async (req, res) => {
  try {
    const { origin, destination, name, distance } = req.body;
    const route = await Route.create({ origin, destination, name, distance });
    const response = {
      status_response: true,
      message: "Data route created",
      errors: null,
      data: route,
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

exports.findOneRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const route = await Route.findOne({
      where: { id },
    });
    if (!route) {
      const response = {
        status_response: false,
        message: "Route not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    const response = {
      status_response: true,
      message: route.length + " route data",
      errors: null,
      data: route,
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

exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { origin, destination, name, distance } = req.body;

    const route = await Route.findOne({
      where: { id },
    });
    if (!route) {
      const response = {
        status_response: false,
        message: "Route not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    route.set({
      name: name || route.name,
      origin: origin || route.origin,
      destination: destination || route.destination,
      distance: distance || route.distance,
    });
    const response = {
      status_response: true,
      message: route.length + " route data",
      errors: null,
      data: route,
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

exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findOne({
      where: { id },
    });
    if (!route) {
      const response = {
        status_response: false,
        message: "Route not found",
        errors: "Error",
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    await Route.destroy({
      where: { id },
    });
    const response = {
      status_response: true,
      message: "Data Route has been deleted",
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
