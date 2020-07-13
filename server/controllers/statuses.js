const Status = require("../models/status");

class StatusesController {
 
  static async getAll(req, res) {
    try {
      const statuses = await Status.find();
      return res.send(statuses);
    } catch (error) {
      console.log(error.message)
    }
    
  }
  static async getById(req, res) {
    try {
      const statusId = req.params.id;
      const status = await Status.findById(statusId);
      return res.send(status);
    } catch (error) {
      console.log(error.message)
    }
   
  }
  static async create(req, res) {
    try {
      const newStatusData = req.body;
      const newStatus = await Status.create(newStatusData);
      return res.send(newStatus);
    } catch (error) {
      console.log(error.message)
    }
   
  }
  static async update(req, res) {
    try {
      const { idStatus, ...updatedStatusData } = req.body;
    const updatedStatus = await Status.findByIdAndUpdate(
      idStatus,
      updatedStatusData
    );
    return res.send(updatedStatus);
    } catch (error) {
      console.log(error.message)
    }
    
  }
  static async removeById(req, res) {
    try {
      const statusId = req.params.id;
      const removedStatus = await Status.findByIdAndRemove(statusId);
      return res.send(removedStatus);
    } catch (error) {
      console.log(error.message)
    }
   
  }
}

module.exports = StatusesController;
