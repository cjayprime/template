import gql from 'graphql-tag';
import { startOfToday, formatISO, subHours } from 'date-fns';

const last24 = formatISO(subHours(new Date(), 24));
const startOfTodayISO = formatISO(new Date(startOfToday()));

export const ALL_DASHBOARD_DATA = gql`
  query allDashboardData {
    totalLab: allLabRequests {
      totalCount
    }
    newlabRequest: allLabRequests(
      filter: {
        requestDate: { greaterThan: "${last24}" }
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
              greaterThan: "${last24}"
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
            stateChangeDate: { greaterThan: "${last24}" }
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
        dateOfDeath: { greaterThan: "${last24}" }
      }
    ) {
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
            dateDischarged: { greaterThan: "${last24}" }
          }
        ]
      }
    ) {
      totalCount
    }
    positivePatientByLGA: allPatients(
      filter: {
        labRequestsByPatientId: { some: { result: { equalTo: POSITIVE } } }
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
            status: { equalTo: ADMITTED }
            locationByLocationId: { locationType: { equalTo: ICU } }
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
            status: { equalTo: ADMITTED }
            locationByLocationId: { locationType: { equalTo: ICU } }
            dateAdmitted: { greaterThan: "${last24}" }
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
            status: { equalTo: ADMITTED }
            locationByLocationId: { locationType: { equalTo: ISOLATION } }
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
            status: { equalTo: ADMITTED }
            locationByLocationId: { locationType: { equalTo: ISOLATION } }
            dateAdmitted: { greaterThan: "${last24}" }
          }
        }
      }
    ) {
      totalCount
    }

    newCalls: allCallLogs(
      filter: { createdAt: { greaterThan: "${last24}" } }
    ) {
      totalCount
    }
    totalCalls: allCallLogs {
      totalCount
    }
    positiveCasesByDate: allLabRequests(
      filter: { result: { equalTo: POSITIVE } }
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
    admissionByDate: allPatientLocations(
      filter: { status: { equalTo: ADMITTED } }
    ) {
      totalCount
      nodes {
        dateAdmitted
      }
    }

    todayPositiveCases: allLabRequests(
      filter: {
        result: { equalTo: POSITIVE }
        resultUpdateDate: { greaterThan: "${startOfTodayISO}" }
      }
    ) {
      totalCount
    }
    todayDischaredCases: allPatientLocations(
      filter: {
        status: { equalTo: DISCHARGED }
        dateDischarged: { greaterThan: "${startOfTodayISO}" }
      }
    ) {
      totalCount
    }
    todayDeathCases: allDeceasedPatients(
      filter: { dateOfDeath: { greaterThan: "${startOfTodayISO}" } }
    ) {
      totalCount
    }
    allDeceasedPatients {
      totalCount
    }
    allPositivePatient: allPatients(
      filter: {
        labRequestsByPatientId: { some: { result: { equalTo: POSITIVE } } }
      }
    ) {
      totalCount
    }
    allDischargedPatients: allPatients(
      filter: {
        patientLocationsByPatientId: { some: { status: { equalTo: DISCHARGED } } }
      }
    ) {
      totalCount
    }
    # Patients that are not discharged or deceased
    allActiveCases: allPatients(
      filter: {
        and: {
          patientLocationsByPatientId: {
            some: { status: { notEqualTo: DISCHARGED } }
          }
          labRequestsByPatientId: { some: { result: { equalTo: POSITIVE } } }
        }
      }
    ) {
      totalCount
      nodes {
        sex
        nationality
        activeLabResults: labRequestsByPatientId {
          nodes {
            result
            resultUpdateDate
          }
        }
      }
    }
    positiveTestSamples: allLabRequests(
      filter: { result: { equalTo: POSITIVE } }
    ) {
      nodes {
        resultUpdateDate
        requestDate
      }
    }
    allTestSamples: allLabRequests {
      nodes {
        resultUpdateDate
        requestDate
      }
    }

    recoveredByDate: allPatientLocations(
      filter: {
        status: { equalTo: DISCHARGED }
        patientByPatientId: {
          labRequestsByPatientId: { some: { result: { equalTo: NEGATIVE } } }
        }
      }
    ) {
      nodes {
        dateDischarged
      }
    }
  }
`;
