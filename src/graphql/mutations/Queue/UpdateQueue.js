import gql from 'graphql-tag';

export const UPDATE_QUEUE = gql`
  mutation($input: UpdateQueueInput! $filter: QueueFilter!) {
    updateQueue(input: $input) {
      query {
        allQueues(filter: $filter){
          nodes {
            queueTaskStatusesByTaskId {
              nodes {
                id
                status
              }
            }
            nodeId
            team
            patientByPatientId {
              firstname
              nodeId
              lastname
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
