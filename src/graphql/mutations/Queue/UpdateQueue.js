import gql from 'graphql-tag';

export const UPDATE_QUEUE = gql`
  mutation($input: UpdateQueueInput!, $filter: QueueFilter!) {
    updateQueue(input: $input) {
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
      userByAcceptedBy {
        firstname
      }
    }
  }
`;
