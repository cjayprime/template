

import gql from 'graphql-tag';

export const SEND_SMS = gql`
  mutation($input: SmsInputPayload!) {
    sendSms(input: $input) { 
      messageId
    }
  }
`;



