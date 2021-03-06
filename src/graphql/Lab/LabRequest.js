import gql from 'graphql-tag';

export const ALL_LAB_REQUEST = gql`
  query allLabRequests($filter: LabRequestFilter, $offset: Int) {
    allLabRequests(filter: $filter, offset: $offset) {
      nodes {
        sampleNumber
        result
        testName
        specimenType
        specimenNumber
        specimenNotes
        requestDate
        nodeId
        id
        patientByPatientId {
          id
          epidNumber
          phoneNumber
        }
        userByAcceptedBy {
          firstname
          lastname
        }
        userByRequestedBy {
          firstname
          lastname
        }
        labRequestStatusesByLabRequestId {
          nodes {
            status
            stateChangeDate
          }
        }
        patientByPatientId {
          firstname
          lastname
          phoneNumber
          queuesByPatientId {
            nodes {
              id
            }
          }
        }
      }
      totalCount
    }
  }
`;
