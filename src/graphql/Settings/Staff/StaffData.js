import gql from 'graphql-tag';

export const ALL_STAFF = gql`
  query allStaff($filter: UserFilter, $offset: Int, $orderBy: [UsersOrderBy!]) {
    allUsers(filter: $filter, offset: $offset, orderBy: $orderBy) {
      nodes {
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
