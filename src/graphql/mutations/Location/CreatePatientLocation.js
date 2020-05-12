import gql from 'graphql-tag';

export const CREATE_PATIENT_LOCATION = gql`
  mutation($input: CreatePatientLocationInput!) {
    createPatientLocation(input: $input) {
      patientLocation {
        id
      }
    }
  }
`;