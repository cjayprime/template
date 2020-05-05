import gql from 'graphql-tag';

export const CREATE_LOCATION = gql`
  mutation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      location {
        id
      }
      query {
        allLocations {
          nodes {
            name
            numberOfBeds
            patientLocationsByLocationId {
              totalCount
            }
          }
        }
      }
    }
  }
`;
