const { buildSchema } = require("graphql");

const schema = buildSchema(`
  scalar Date

  type Task {
    _id: ID
    userId: ID
    name: String
    title: String
    statusId: Status
    description: String
    createdAt: Date
    updatedAt: Date
  }
  
  type Status {
    _id: ID
    title: String
    description: String
  }
  
  input CreateTaskInput {
    description: String!
    title: String!
  }
  
  input UpdateTaskInput {
    idTask: String!
    title: String!
  }
  
  type Query {
    getAllTasks: [Task]
  }
  
  type Mutation {
    createTask(taskData: CreateTaskInput): Task
    updateTask(updateTaskData: UpdateTaskInput): Task
    removeTask(taskId: ID): ID
  }
`);

module.exports = schema;
