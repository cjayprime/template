import gql from 'graphql-tag';

export const ALL_QUEUES = gql`query allQueues(
    $filter: QueueFilter
    $offset: Int
) {
    allQueues(
        filter: $filter
        offset: $offset
    ) {
      
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
      totalCount
    }
}` 
