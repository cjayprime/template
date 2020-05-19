import {
  addQueueStatus,
  addLabRequest,
  addToQueue
} from 'bundles/queue/utilities/queue';
import {
  BOOK_APPOINTMENT,
  APPOINTMENT_BOOKED,
  DRIVE_THROUGH,
  HOME_PICK_UP
} from 'bundles/queue/utilities/stateTransition';

const saveLabRquestAddQueueAndAddQueueStatus = (
  epidNumber,
  patientId,
  newTeam,
  addQueue,
  reason,
  user,
  date,
  createLabRequest,
  APPOINTMENT_BOOKED,
  parseQueue,
  setQueueState,
  createQueueTaskStatus,
  queueId,
  filter,
  setDialogState
) => {
 

  const response = addToQueue({
    patientEpidNumber: epidNumber,
    team: newTeam,
    id: patientId,
    addQueue
  });

  if (response) {
    submitLabrequestAndSaveNextSate(
      reason,
      user,
      date,
      patientId,
      createLabRequest,
      APPOINTMENT_BOOKED,
      parseQueue,
      setQueueState,
      createQueueTaskStatus,
      queueId,
      filter,
      setDialogState
    );
  }
};

export const saveNextState = async (
  queueId,
  status,
  filter,
  parseQueue,
  setQueueState,
  createQueueTaskStatus
) => {
  const response = await addQueueStatus({
    id: queueId,
    status: status,
    type: 'TEAM_TASK',
    createQueueTaskStatus,
    filter,
    parseQueue,
    setQueueState
  });

  if (response) {
    console.log('Success');
    return true;
  }

  return false;
};

export const submitLabrequestAndSaveNextSate = async (
  notes = '',
  user = 1,
  requestDate = new Date(),
  patientId,
  createLabRequest,
  nextStatus,
  parseQueue,
  setQueueState,
  createQueueTaskStatus,
  queueId,
  filter,
  setDialogState
) => {
  const response = addLabRequest({
    notes,
    user,
    requestDate,
    patientId,
    createLabRequest
  });

  if (response) {
    const saveNext = saveNextState(
      queueId,
      nextStatus,
      filter,
      parseQueue,
      setQueueState,
      createQueueTaskStatus
    );

    console.log('Saved Next state. Should be final', response);

    setDialogState(false);
  }
};

const openDialog = (
  setPatientInfo,
  setDialogState,
  patient,
  setSaveApiData
) => {
  setPatientInfo({ ...patient });
  setDialogState(true);
};

const saveState = (
  reason,
  user,
  date,
  patientId,
  createLabRequest,
  APPOINTMENT_BOOKED,
  parseQueue,
  setQueueState,
  createQueueTaskStatus,
  queueId,
  filter,
  setDialogState,
  epidNumber,
  newTeam,
  addQueue
) => {
  if (reason === DRIVE_THROUGH) {
    submitLabrequestAndSaveNextSate(
      reason,
      user,
      date,
      patientId,
      createLabRequest,
      APPOINTMENT_BOOKED,
      parseQueue,
      setQueueState,
      createQueueTaskStatus,
      queueId,
      filter,
      setDialogState
    );
  }

  if (reason === HOME_PICK_UP) {
    saveLabRquestAddQueueAndAddQueueStatus(
      epidNumber,
      patientId,
      newTeam,
      addQueue,
      reason,
      user,
      date,
      createLabRequest,
      APPOINTMENT_BOOKED,
      parseQueue,
      setQueueState,
      createQueueTaskStatus,
      queueId,
      filter,
      setDialogState
    ); 
    // lab // add to queu // addtoQueuStatus
  }
  // 'Drive through' === 'Lab request and add queueSTate'
};

export const parseEpidSurveillance = (row, action, api, nextStatus) => {
  const {
    patient: { id, queueId, patientId, reason, date, epidNumber, newTeam }
  } = row;

  const {
    createQueueTaskStatus,
    filter,
    parseQueue,
    setQueueState,
    createLabRequest,
    setPatientInfo,
    setDialogState,
    addQueue
  } = api; 

  switch (action) {
    case BOOK_APPOINTMENT:
      return openDialog(setPatientInfo, setDialogState, row.patient);

    case APPOINTMENT_BOOKED:
      return saveState(
        reason,
        1,
        date,
        patientId,
        createLabRequest,
        APPOINTMENT_BOOKED,
        parseQueue,
        setQueueState,
        createQueueTaskStatus,
        queueId,
        filter,
        setDialogState,
        epidNumber,
        newTeam,
        addQueue
      );
  }
};
