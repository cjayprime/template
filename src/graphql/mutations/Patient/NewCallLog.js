import gql from 'graphql-tag';

export const NEW_CALL_LOG = gql`
  mutation($input: CreateCallLogInput!) {
    createCallLog(input: $input) {
      callLog {
        callTime
        callSummary
      }
    }
  }
`;
