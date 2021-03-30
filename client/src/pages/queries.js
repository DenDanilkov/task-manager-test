import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query {
    getAllTasks {
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
