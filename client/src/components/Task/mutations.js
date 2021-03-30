import { gql } from '@apollo/client';

export const REMOVE_TASK = gql`
  mutation removeTask($taskId: ID) {
    removeTask(taskId: $taskId)
  }
`;
