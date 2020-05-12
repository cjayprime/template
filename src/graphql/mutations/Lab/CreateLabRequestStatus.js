import gql from 'graphql-tag';

export const CREATE_LAB_REQUEST_STATUS = gql`
  mutation($input: CreateLabRequestStatusInput!) {
    createLabRequestStatus(input: $input) {
      query {
        allLabRequests {
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
              queuesByPatientId {
                nodes {
                  id
                }
              }
            }
          }
        }
      }
      labRequestStatus {
        id
      }
    }
  }
`;
