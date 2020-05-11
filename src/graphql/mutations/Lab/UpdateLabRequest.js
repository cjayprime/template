import gql from 'graphql-tag';

export const UPDATE_LAB_REQUEST = gql`
  mutation($input: UpdateLabRequestInput!) {
    updateLabRequest(input: $input) {
      labRequest {
      id
      }
    }
  }
`