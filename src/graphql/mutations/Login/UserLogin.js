import gql from 'graphql-tag';

export const USER_LOGIN = gql`
  mutation($input: UserLoginInput!) {
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
