import gql from 'graphql-tag';

export const ALL_QUEUE_TASK_STATUS = gql`
  query allQueueTaskStatuses(
    $filter: QueueTaskStatusFilter!
    $labFilter: LabRequestStatusFilter
  ) {
    allQueueTaskStatuses(filter: $filter) {
      totalCount
      nodes {
        status
        taskType
        queueByTaskId {
          scheduledDate
          requestDate
          team
          patientByPatientId {
            firstname
            lastname
            epidNumber
            sex
            birthDate
            patientCasesByPatientId {
              nodes {
                status
                riskLevel
              }
            }
          }
        }
      }
    }

    labRequets: allLabRequestStatuses(filter: $labFilter) {
      nodes {
        stateChangeDate
        status
        labRequestId
        labRequestByLabRequestId {
          requestDate
          patientByPatientId {
            firstname
            lastname
            sex
            birthDate
            patientCasesByPatientId {
              nodes {
                riskLevel
              }
            }
          }
        }
      }
    }
  }
`;
