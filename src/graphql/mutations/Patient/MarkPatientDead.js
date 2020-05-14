import gql from 'graphql-tag';

export const CREATE_DECEASED_PATIENT = gql`
  mutation($input: CreateDeceasedPatientInput!) {
    createDeceasedPatient(input: $input) {
      deceasedPatient {
        id
        dateOfDeath
      }
    }
  }
`;
