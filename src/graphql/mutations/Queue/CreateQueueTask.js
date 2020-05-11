import gql from 'graphql-tag';

export const CREATE_QUEUE_TASK_STATUS = gql`
  mutation($input: CreateQueueTaskStatusInput!) {
    createQueueTaskStatus(input: $input) {
      queueTaskStatus {
        id
      }
    }
  }
`;

