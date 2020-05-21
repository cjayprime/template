import gql from 'graphql-tag';

export const QUEUE_SUBSCRIPTION = gql`
  subscription currentUserUpdated{
    currentUserUpdated {
    patient {
      firstname
      lastname
      email
    }
  }
  }
`; 