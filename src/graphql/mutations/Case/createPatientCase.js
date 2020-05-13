import gql from 'graphql-tag';

export const CREATE_PATIENT_CASE = gql`
  mutation($input: CreatePatientCaseInput!) {
    createPatientCase(input: $input) { 
      
      patientByPatientId {
        firstname
        id
      }
    }
  }
`;

