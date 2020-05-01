import gql from 'graphql-tag';

export const CREATE_PATIENT = gql`mutation(
    $input: CreatePatientInput!
) {
    createPatient(
        input: $input
    ) {
        patient {
            id
        }
    }
}
`