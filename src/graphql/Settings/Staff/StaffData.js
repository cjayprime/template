import gql from 'graphql-tag';

export const ALL_STAFF = gql`
  query allStaff($filter: UserFilter, $offset: Int, $orderBy: [UsersOrderBy!]) {
    allUsers(filter: $filter, offset: $offset, orderBy: $orderBy) {
      nodes {
        nodeId
        id
        firstname
        lastname
        title
        team
        email
        phoneNumber
        role
        sex
        speciality
        jobTitle
        department
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
            createTriage
            settings
            bedManagement
            kpi
            staff
            location
          }
        }
      }
    }
  }
`;

export const SINGLE_STAFF = gql`
  query($id: Int!) {
    userById(id: $id) {
      id
      firstname
      lastname
      title
      role
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
          createTriage
          settings
          bedManagement
          kpi
          staff
          location
        }
      }
    }
  }
`;
