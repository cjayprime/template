import {
  BOOK_APPOINTMENT,
  APPOINTMENT_BOOKED
} from 'bundles/queue/utilities/stateTransition';
import { addQueueStatus, addToQueue } from 'bundles/queue/utilities/queue';

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
  epidNumber,
  newTeam,
  patientId,
  addQueue,
  queueId,
  status,
  createQueueTaskStatus,
  filter,
  parseQueue,
  setQueueState,
  setDialogState
) => {
  const response = addToQueue({
    patientEpidNumber: epidNumber,
    team: newTeam,
    id: patientId,
    addQueue
  });

  if (response) {
    console.log('Success in Response');
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
  }
};

export const parsePyschosocial = (row, action, api, nextStatus) => {
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
      return saveNextState(
        epidNumber,
        newTeam,
        patientId,
        addQueue,
        queueId,
        APPOINTMENT_BOOKED,
        createQueueTaskStatus,
        filter,
        parseQueue,
        setQueueState,
        setDialogState
      );
  }
};
