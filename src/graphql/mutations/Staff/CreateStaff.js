import gql from 'graphql-tag';

export const CREATE_STAFF = gql`
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        firstname
        lastname
        title
        team
        pass
        userAccessLevelsByUserId {
          nodes {
            id
            lab
            logCall
            contactInfo
            patientProfile
            notes
            queues
            appointments
            dashboard
            reports
            admitDischarge
          }
        }
      }
    }
  }
`;

export const UPDATE_STAFF = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        firstname
        lastname
        title
        team    
        userAccessLevelsByUserId {
          nodes {
            id
            lab
            logCall
            contactInfo
            patientProfile
            notes
            queues
            appointments
            dashboard
            reports
            admitDischarge
          }
        }
      }
    }
  }
`;

export const SET_PASSWORD = gql`
  mutation($input: UserInputPayload!) {
    saveUserPassword(input: $input) {
      token
    }
  }
`
