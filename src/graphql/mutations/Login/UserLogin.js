import gql from 'graphql-tag';

export const USER_LOGIN = gql`
  mutation($input: UserInputPayload!) {
    loginUser(input: $input) {
      status
      token
      payload {
        id
        firstname
        lastname
        role
        team
      }
    }
  }
`;
