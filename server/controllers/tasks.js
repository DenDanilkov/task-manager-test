const Task = require("../models/task");
const Status = require("../models/status");

class TasksController {
  static async getAll(req, res) {
    const tasks = await Task.find().populate(["userId", "statusId"]);
    return res.send(tasks);
  }
  static async getById(req, res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate(["userId", "statusId"]);
    return res.send(task);
  }
  static async getByCriteria(req, res) {
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
  }
  static async create(req, res) {
    const userId = req.userInfo.userId;
    const newTaskData = req.body;
    const newStatus = await Status.create({
      description: newTaskData.description,
    });
    const newTask = await Task.create({
      ...newTaskData,
      userId,
      statusId: newStatus._id,
    });
    return res.send(newTask);
  }
  static async update(req, res) {
    const { idTask, ...updatedTaskData } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(idtask, updatedTaskData);
    return res.send(updatedTask);
  }
  static async removeById(req, res) {
    const taskId = req.params.id;
    const removedTask = await Task.findByIdAndRemove(taskId);
    return res.send(removedTask);
  }
}

module.exports = TasksController;
