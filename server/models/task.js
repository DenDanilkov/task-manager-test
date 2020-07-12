const { Schema, model } = require("mongoose");

const task = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    statusId: {
      type: Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Task", task);
