import gql from 'graphql-tag';

export const CREATE_QUEUE = gql`mutation(
    $input: CreateQueueInput!
) {
    createQueue(
        input: $input
    ) {
        patientByPatientEpidNumber {
            firstname
      lastname
      epidNumber
        }
    }
}
`
 