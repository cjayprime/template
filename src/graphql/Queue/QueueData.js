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
          }
        }
        team
        patientByPatientId {
          firstname
          lastname
        }
        requestDate
          
        userByAcceptedBy {
          firstname
          lastname
        }
      }
      totalCount
    }
}` 
