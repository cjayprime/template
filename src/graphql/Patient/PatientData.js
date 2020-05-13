import gql from 'graphql-tag';

export const ALL_PATIENTS = gql`
  query AllPatients($filter: PatientFilter, $offset: Int) {
    allPatients(filter: $filter, offset: $offset) {
      nodes {
        id
        firstname
        lastname
        birthDate
        sex
        phoneNumber
        city
        countryOfResidence
        email
        epidNumber
        lga
        location
        nationality
        occupation
        streetName
        state
        notes
        streetName2
        patientCasesByPatientId {
          nodes {
            id
            status
            riskLevel
            userBySubmittedBy {
              title
              firstname
              lastname
            }
            notes
            createdAt
          }
        }
        callLogsByPatientId {
          nodes {
            id
            callSummary
            callTime
          }
        }
        labRequestsByPatientId {
          nodes {
            id
            userByAcceptedBy {
              title
              firstname
              lastname
            }
            userByRequestedBy {
              title
              firstname
              lastname
            }
            result
            testName
            requestDate
            labRequestStatusesByLabRequestId(last: 1) {
              nodes {
                id
                status
              }
            }
          }
        }
        patientLocationsByPatientId {
          nodes {
            userByAdmittedBy {
              firstname
              title
              lastname
            }
            dateAdmitted
            id
          }
        }
        deceasedPatientByPatientId {
          auscultatoryBreathSounds
          autopsy
          causeOfDeath
          centralPulses
          cornealReflex
          dateOfDeath
          examinationFindings
          familyNotified
          id
          interventionAndOutcome
          locationOfDeath
          nodeId
          onReportValueChange
          organDonor
          patientId
          peripheralPulses
          plan
          pupils
          responseToStimuli
          spontaneousRespiration
        }
      }
      totalCount
    }
  }
`;
