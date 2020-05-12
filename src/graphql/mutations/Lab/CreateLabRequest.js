import gql from 'graphql-tag';

export const CREATE_LAB_REQUEST = gql`
  mutation($input: CreateLabRequestInput!) {
    createLabRequest(input: $input) {
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
      labRequest {
        id
      }
    }
  }
`;
