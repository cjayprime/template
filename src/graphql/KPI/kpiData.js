import gql from 'graphql-tag';

export const KPI = gql`
  query AllKpi{
    highRiskPatientPickup: allQueues(
    filter: {
      and: [
        { team: { equalTo: "Evac & Decon" } }
        { queueTaskStatusesByTaskIdExist: true }
        {
          patientByPatientId: {
            patientCasesByPatientId: { every: { riskLevel: { equalTo: HIGH } } }
          }
        }
        {
          queueTaskStatusesByTaskId: {
            none: { status: { equalTo: "Complete" } }
          }
        }
      ]
    }
  ) {
    totalCount
    nodes {
      requestDate
      scheduledDate
      team
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
      queueTaskStatusesByTaskId {
        nodes {
          status
        }
      }
    }
  }

  labsResultPending: allLabRequests(
    filter: {
      and: [
        {
          labRequestStatusesByLabRequestId: {
            none: { status: { equalTo: "Completed" } }
          }
        }
        { labRequestStatusesByLabRequestIdExist: true }
      ]
    }
  ) {
    totalCount
    nodes {
      testName
      id
      labRequestStatusesByLabRequestId {
        totalCount
        nodes {
          status
          stateChangeDate
          labRequestByLabRequestId {
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
  }

  sampleCollection: allQueues(
    filter: {
      and: [
        { team: { equalTo: "RRT" } }
        {
          queueTaskStatusesByTaskId: {
            every: { status: { notEqualTo: "Sample Collected" } }
          }
        }
      ]
    }
  ) {
    totalCount

    nodes {
      requestDate
      scheduledDate
      team
      queueTaskStatusesByTaskId {
        nodes {
          status
          taskType
        }
      }
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
`; 
