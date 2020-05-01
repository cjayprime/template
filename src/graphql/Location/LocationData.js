import gql from 'graphql-tag';

export const ALL_LOCATION = gql`query allLocations(
    $filter: LocationFilter
    $offset: Int
) {
    allLocations(
        filter: $filter
        offset: $offset
    ) {
        nodes {
        name
        numberOfBeds
        createdAt
        patientsByPatientLocationLocationIdAndPatientId {
          nodes{
            firstname
            lastname
            phoneNumber
            sex
          }
        }
        patientLocationsByLocationId {
        
          nodes {
            patientId
            status
            dischargeReason
          }
        }
      }
      totalCount
    }
}`

