import gql from 'graphql-tag';

export const CREATE_LAB_REQUEST = gql`
  mutation($input: CreateLabRequestInput!) {
    createLabRequest(input: $input) {
      labRequest {
      id
      }
    }
  }
`