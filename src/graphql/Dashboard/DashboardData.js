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
          { result: { equalTo: POSITIVE } }
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

    positiveCases: allLabRequests(filter: { result: { equalTo: POSITIVE } }) {
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

    totalFatalities: allPatientCases(filter: { status: { equalTo: "DEATH" } }) {
      totalCount
    }

    dischargedPatients: allPatientLocations(
      filter: { and: [{ status: { equalTo: DISCHARGED } }] }
    ) {
      totalCount
    }
    newDischargedPatients: allPatientLocations(
      filter: {
        and: [
          { status: { equalTo: DISCHARGED } }
          {
            dateDischarged: { greaterThan: "2020-05-09T13:22:04.251616+00:00" }
          }
        ]
      }
    ) {
      totalCount
    }
  }
`;
