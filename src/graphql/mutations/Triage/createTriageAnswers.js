import gql from 'graphql-tag';

export const CREATE_TRIAGE_ANSWERS = gql`
  mutation($input: CreateTriageAnswerInput!) {
    createTriageAnswer(input: $input) {
      patientByPatientId {
        firstname
        id
      }
    }
  }
`;
