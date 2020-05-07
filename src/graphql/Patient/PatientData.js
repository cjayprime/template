import gql from 'graphql-tag';

export const ALL_PATIENTS = gql`
  query AllPatients($filter: PatientFilter, $offset: Int) {
    allPatients(filter: $filter, offset: $offset) {
      nodes {
        id
        firstname
        lastname
        epidNumber
        phoneNumber
        epidNumber
        email
        birthDate
        sex
        patientCasesByPatientId {
           nodes {
            id
            status
            riskLevel
          }
        }
      }
      totalCount
    }
  }
`; 
