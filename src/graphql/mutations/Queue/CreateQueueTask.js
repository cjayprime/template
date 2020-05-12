import gql from 'graphql-tag';

export const CREATE_QUEUE_TASK_STATUS = gql`
  mutation($input: CreateQueueTaskStatusInput!, $filter: QueueFilter!) {
    createQueueTaskStatus(input: $input) {
      query {
        allQueues(filter: $filter) {
          nodes {
            queueTaskStatusesByTaskId {
              nodes {
                id
                status
                taskId
                stateChangeDate
                taskType
              }
            }
            nodeId
            id
            team
            patientByPatientId {
              firstname
              nodeId
              lastname
              epidNumber
              id
              sex
              birthDate
              patientCasesByPatientId {
                nodes {
                  status
                  riskLevel
                }
              }
            }
            requestDate
            userByAcceptedBy {
              firstname
              lastname
              id
            }
          }
        }
      }
      queueTaskStatus {
        id
      }
    }
  }
`;
