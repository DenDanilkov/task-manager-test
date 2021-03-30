import { gql } from '@apollo/client';

export const ADD_TASK = gql`
  mutation createTask($taskData: CreateTaskInput) {
    createTask(taskData: $taskData) {
      _id
      userId
      title
      statusId {
        description
        title
        _id
      }
      description
      createdAt
      updatedAt
    }
  }
`;
