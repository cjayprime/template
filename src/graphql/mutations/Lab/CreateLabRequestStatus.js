import gql from 'graphql-tag';

export const CREATE_LAB_REQUEST_STATUS = gql`
  mutation($input: CreateLabRequestStatusInput!) {
    createLabRequestStatus(input: $input) {
      labRequestStatus {
        id
      }
    }
  }
`;
