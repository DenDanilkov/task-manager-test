const Task = require("../models/task");
const Status = require("../models/status");

const root = {
  getAllTasks: async (params, request) => {
    // const userId = request.userInfo.id;
    const tasks = await Task.find().populate("statusId");
    return tasks;
  },
  createTask: async ({ taskData }, request) => {
    // const userId = request.userInfo.id;
    const newTaskData = taskData;
    const newStatus = await Status.create({
      description: newTaskData.description,
    });
    let newTask = await Task.create({
      ...newTaskData,
      ...{
        userId: "6061cf1846c562002f6c62b1",
      },
      statusId: newStatus._id,
    });
    newTask = await newTask.populate("statusId").execPopulate();
    return newTask;
  },
  updateTask: async ({ updateTaskData }, request) => {
    const { idTask, ...updatedTaskData } = updateTaskData;
    let updatedTask = await Task.findByIdAndUpdate(idTask, updatedTaskData, {
      new: true,
    });
    updatedTask = await updatedTask.populate("statusId").execPopulate();
    return updatedTask;
  },
  removeTask: async (taskId) => {
    Task.findByIdAndRemove(taskId);
    return taskId;
  },
};

module.exports = root;
