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
          { result: { equalTo: positive } }
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

    positiveCases: allLabRequests(filter: { result: { equalTo: positive } }) {
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
      filter: { and: [{ status: { equalTo: discharged } }] }
    ) {
      totalCount
    }
    newDischargedPatients: allPatientLocations(
      filter: {
        and: [
          { status: { equalTo: discharged } }
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
    admissionByDate: allPatientLocations(
      filter: { status: { equalTo: admitted } }
    ) {
      totalCount
      nodes {
        dateAdmitted
      }
    }

    todayPositiveCases: allLabRequests(
      filter: {
        result: { equalTo: positive }
        resultUpdateDate: { greaterThan: "${startOfTodayISO}" }
      }
    ) {
      totalCount
    }
    todayDischaredCases: allPatientLocations(
      filter: {
        status: { equalTo: discharged }
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
        labRequestsByPatientId: { some: { result: { equalTo: positive } } }
      }
    ) {
      totalCount
    }
    allDischargedPatients: allPatients(
      filter: {
        patientLocationsByPatientId: { some: { status: { equalTo: discharged } } }
      }
    ) {
      totalCount
    }
    # Patients that are not discharged or deceased
    allActiveCases: allPatients(
      filter: {
        and: {
          deceasedPatientsByPatientIdExist: false
          patientLocationsByPatientId: {
            some: { status: { notEqualTo: discharged } }
          }
          labRequestsByPatientId: { some: { result: { equalTo: positive } } }
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
      filter: { result: { equalTo: positive } }
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
        status: { equalTo: discharged }
        patientByPatientId: {
          labRequestsByPatientId: { some: { result: { equalTo: negative } } }
        }
      }
    ) {
      nodes {
        dateDischarged
      }
    }
  }
`;
