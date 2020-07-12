const Status = require("../models/status");

class StatusesController {
  static async getAll(req, res) {
    const statuses = await Status.find();
    return res.send(statuses);
  }
  static async getById(req, res) {
    const statusId = req.params.id;
    const status = await Status.findById(statusId);
    return res.send(status);
  }
  static async create(req, res) {
    const newStatusData = req.body;
    const newStatus = await Status.create(newStatusData);
    return res.send(newStatus);
  }
  static async update(req, res) {
    const { idStatus, ...updatedStatusData } = req.body;
    const updatedStatus = await Status.findByIdAndUpdate(
      idStatus,
      updatedStatusData
    );
    return res.send(updatedStatus);
  }
  static async removeById(req, res) {
    const statusId = req.params.id;
    const removedStatus = await Status.findByIdAndRemove(statusId);
    return res.send(removedStatus);
  }
}

module.exports = StatusesController;
