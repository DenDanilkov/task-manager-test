const Task = require("../models/task");

class TasksController {
  static async getAll(req, res) {
    const tasks = await Task.find();
    return res.send(tasks);
  }
  static async getById(req, res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    return res.send(task);
  }
  static async create(req, res) {
    const newTaskData = req.body;
    const newTask = await Task.create(newTaskData);
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
