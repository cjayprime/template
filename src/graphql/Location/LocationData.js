import gql from 'graphql-tag';

export const ALL_LOCATION = gql`
  query allLocations($filter: LocationFilter, $offset: Int) {
    allLocations(filter: $filter, offset: $offset) {
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
      totalCount
    }
  }
`; 
