import gql from 'graphql-tag';

export const UPDATE_LOCATION = gql`
  mutation($input: UpdateLocationInput!) {
    updateLocation(input: $input) {
      query {
        allLocations {
          nodes {
            name
            numberOfBeds
            createdAt
            id
            patientsByPatientLocationLocationIdAndPatientId {
              nodes {
                firstname
                lastname
                phoneNumber
                epidNumber
                sex
                id
                birthDate
                patientCasesByPatientId {
                  nodes {
                    riskLevel
                  }
                }
              }
              totalCount
            }
            patientLocationsByLocationId {
              nodes {
                patientId
                status
                dischargeReason
                dateAdmitted
              }
              totalCount
            }
          }
        }
      }
      location {
        id
      }
    }
  }
`;
