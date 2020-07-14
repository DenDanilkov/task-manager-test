const Task = require("../models/task");
const Status = require("../models/status");

class TasksController {
  static async getAll(req, res) {
    try {
      const tasks = await Task.find().populate(["userId", "statusId"]);
      return res.send(tasks);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getAllForUser(req, res) {
    try {
      const userId = req.userInfo.id;
      const tasks = await Task.find({ userId }).populate("statusId");

      return res.send(tasks);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getById(req, res) {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId).populate("statusId");
      return res.send(task);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getByCriteria(req, res) {
    try {
      const taskId = req.query;
      const tasks = await Task.aggregate([
        {
          $lookup: {
            from: "status",
            localField: "statusId",
            foreignField: "_id",
            as: "taskStatus",
          },
        },
        { $unwind: "$taskStatus" },
        { $match: { $and: [{ "taskStatus.title": `${req.query.status}` }] } },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            createdAt: 1,
            updatedAt: 1,
            statusId: 1,
            userId: 1,
            status: "$taskStatus.title",
          },
        },
      ]);

      return res.send(tasks);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async create(req, res) {
    try {
      const userId = req.userInfo.id;
      const newTaskData = req.body;
      const newStatus = await Status.create({
        description: newTaskData.description,
      });
      let newTask = await Task.create({
        ...newTaskData,
        userId,
        statusId: newStatus._id,
      });
      newTask = await newTask.populate("statusId").execPopulate();
      return res.send(newTask);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async update(req, res) {
    try {
      const { idTask, ...updatedTaskData } = req.body;
      let updatedTask = await Task.findByIdAndUpdate(idTask, updatedTaskData, {
        new: true,
      });
      updatedTask = await updatedTask.populate("statusId").execPopulate();
      return res.send(updatedTask);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async removeById(req, res) {
    try {
      const taskId = req.params.id;
      const removedTask = await Task.findByIdAndRemove(taskId);
      return res.send(removedTask);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = TasksController;
