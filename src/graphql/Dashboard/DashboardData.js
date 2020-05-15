import gql from 'graphql-tag';

export const ALL_DASHBOARD_DATA = gql`
  query allDashboardData {
    totalLab: allLabRequests {
      totalCount
    }
    newlabRequest: allLabRequests(
      filter: {
        requestDate: { greaterThan: "2020-05-09T13:22:04.251616+00:00" }
      }
    ) {
      totalCount
    }
    positiveCasesNew: allLabRequests(
      filter: {
        and: [
          { result: { equalTo: positive } }
          {
            requestDate: {
              ##new field auto update
              greaterThan: "2020-05-09T13:22:04.251616+00:00"
            }
          }
        ]
      }
    ) {
      totalCount
    }

    positiveCases: allLabRequests(filter: { result: { equalTo: positive } }) {
      totalCount
    }

    newAwaitingResult: allLabRequestStatuses(
      filter: {
        and: [
          { status: { equalTo: "Awaiting tests result" } }
          {
            stateChangeDate: { greaterThan: "2020-05-09T13:22:04.251616+00:00" }
          }
        ]
      }
    ) {
      totalCount
    }

    awaitingResult: allLabRequestStatuses(
      filter: { status: { equalTo: "Awaiting tests result" } }
    ) {
      totalCount
    }

    evacAwaitingPickUp: allQueues(
      filter: { team: { equalTo: "Evac & Decon" } }
    ) {
      totalCount
      nodes {
        queueTaskStatusesByTaskId(
          filter: { status: { equalTo: "Awaiting pick up" } }
        ) {
          totalCount
        }
      }
    }

    totalFatalities: allDeceasedPatients {
      totalCount
    }

    newFatalities: allDeceasedPatients(
      filter: {
        dateOfDeath: { greaterThan: "2020-05-09T13:22:04.251616+00:00" }
      }
    ) {
      totalCount
    }

    dischargedPatients: allPatientLocations(
      filter: { and: [{ status: { equalTo: discharged } }] }
    ) {
      totalCount
    }
    newDischargedPatients: allPatientLocations(
      filter: {
        and: [
          { status: { equalTo: discharged } }
          {
            dateDischarged: { greaterThan: "2020-05-09T13:22:04.251616+00:00" }
          }
        ]
      }
    ) {
      totalCount
    }
    positivePatientByLGA: allPatients(
      filter: {
        labRequestsByPatientId: { some: { result: { equalTo: positive } } }
      }
    ) {
      nodes {
        lga
      }
    }
    currentICU: allPatients(
      filter: {
        patientLocationsByPatientId: {
          some: {
            status: { equalTo: admitted }
            locationByLocationId: { locationType: { equalTo: icu } }
          }
        }
      }
    ) {
      totalCount
    }

    newICU: allPatients(
      filter: {
        patientLocationsByPatientId: {
          some: {
            status: { equalTo: admitted }
            locationByLocationId: { locationType: { equalTo: icu } }
            dateAdmitted: { greaterThan: "2020-05-09T13:22:04.251616+00:00" }
          }
        }
      }
    ) {
      totalCount
    }

    currentIsolation: allPatients(
      filter: {
        patientLocationsByPatientId: {
          some: {
            status: { equalTo: admitted }
            locationByLocationId: { locationType: { equalTo: isolation } }
          }
        }
      }
    ) {
      totalCount
    }

    newIsolation: allPatients(
      filter: {
        patientLocationsByPatientId: {
          some: {
            status: { equalTo: admitted }
            locationByLocationId: { locationType: { equalTo: isolation } }
            dateAdmitted: { greaterThan: "2020-05-09T13:22:04.251616+00:00" }
          }
        }
      }
    ) {
      totalCount
    }

    newCalls: allCallLogs(
      filter: { createdAt: { greaterThan: "2020-05-15T14:10:15.1463+00:00" } }
    ) {
      totalCount
    }
    totalCalls: allCallLogs {
      totalCount
    }
    positiveCasesByDate: allLabRequests(
      filter: { result: { equalTo: positive } }
    ) {
      nodes {
        resultUpdateDate
      }
    }
    fatalitiesByDate: allDeceasedPatients {
      nodes {
        dateOfDeath
      }
    }
  }
`;
