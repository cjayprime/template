import {
  addQueueStatus,
  addPatientLocation
} from 'bundles/queue/utilities/queue';
import {
  BOOK_APPOINTMENT,
  APPOINTMENT_BOOKED,
  MARK_PATIENT_AS_PICKED_UP,
  PATIENT_PICKED_UP,
  ADMIT_PATIENT,
  SUBMIT_ADMITTED,
  COMPLETE,
  ADMITTED
} from 'bundles/queue/utilities/stateTransition';

const openDialog = (
  setPatientInfo,
  setDialogState,
  patient,
  setSaveApiData
) => {
  setPatientInfo({ ...patient });
  setDialogState(true);
};

const saveNextState = async (
  queueId,
  status,
  createQueueTaskStatus,
  filter,
  parseQueue,
  setQueueState,
  setDialogState
) => {
  const queueStatus = await addQueueStatus({
    id: queueId,
    status: status,
    type: 'TEAM_TASK',
    createQueueTaskStatus,
    filter,
    parseQueue,
    setQueueState
  });

  if (queueStatus) {
    console.log('Success in Queue Status');
    setDialogState(false);
  }
};

const admitPatientAndSaveNextState = async (
  patientId,
  locationId,
  admitStatus,
  admittedBy,
  createPatientLocation,
  queueId,
  status,
  createQueueTaskStatus,
  filter,
  parseQueue,
  setQueueState,
  setDialogState
) => {
  // patiendId, locationId, status, admittedBy, createPatientLocation
  const response = await addPatientLocation(
    patientId,
    locationId,
    admitStatus,
    admittedBy,
    createPatientLocation
  );

  if (response) {
    const nexStateSaved = saveNextState(
      queueId,
      status,
      createQueueTaskStatus,
      filter,
      parseQueue,
      setQueueState,
      setDialogState
    );

    if (nexStateSaved) {
      return true;
    }

    return false;
  }
};

export const parseEvacAndDecon = (row, action, api, nextStatus) => {
  const {
    patient: { id, queueId, patientId, reason, date, epidNumber, newTeam, locationId, admittedBy }
  } = row;

  const {
    createQueueTaskStatus,
    filter,
    parseQueue,
    setQueueState,
    createLabRequest,
    setPatientInfo,
    setDialogState,
    createPatientLocation,
    addQueue
  } = api;

  switch (action) {
    case BOOK_APPOINTMENT:
      return openDialog(setPatientInfo, setDialogState, row.patient);

    case APPOINTMENT_BOOKED:
      return saveNextState(
        queueId,
        APPOINTMENT_BOOKED,
        createQueueTaskStatus,
        filter,
        parseQueue,
        setQueueState,
        setDialogState
      );

    case MARK_PATIENT_AS_PICKED_UP:
      return saveNextState(
        queueId,
        PATIENT_PICKED_UP,
        createQueueTaskStatus,
        filter,
        parseQueue,
        setQueueState,
        setDialogState
      );

    case ADMIT_PATIENT:
      return openDialog(setPatientInfo, setDialogState, row.patient);

    case SUBMIT_ADMITTED:
      admitPatientAndSaveNextState(
        patientId,
        locationId,
        ADMITTED,
        admittedBy,
        createPatientLocation,
        queueId,
        COMPLETE,
        createQueueTaskStatus,
        filter,
        parseQueue,
        setQueueState,
        setDialogState 
      );
  }
};
