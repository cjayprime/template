import {
  MARK_SAMPLE_AS_RECIEVED,
  DELIVER_SAMPLE_LAB
} from 'bundles/queue/utilities/stateTransition';
import { addQueueStatus, addLabRequest } from 'bundles/queue/utilities/queue';

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
    return true
  }

  return false
};

export const submitLabrequestAndSaveNextSate = async (
  notes = 'Sent From RRT',
  user = 1,
  requestDate = new Date(),
  patientId,
  createLabRequest,
  nextStatus,
  parseQueue,
  setQueueState,
  createQueueTaskStatus,
  queueId,
  filter
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

    console.log('Saved Next state. Should be final', saveNext)
  }
};

export const parseRRT = (row, action, api, nextStatus) => {
  const {
    patient: { id, queueId, patientId }
  } = row;

  const {
    createQueueTaskStatus,
    filter,
    parseQueue,
    setQueueState,
    createLabRequest
  } = api;

  switch (action) {
    case MARK_SAMPLE_AS_RECIEVED:
      return saveNextState(
        queueId,
        nextStatus,
        filter,
        parseQueue,
        setQueueState,
        createQueueTaskStatus
      );

    case DELIVER_SAMPLE_LAB:
      return submitLabrequestAndSaveNextSate(
        'Sent From RRT',
        1,
        new Date(),
        patientId,
        createLabRequest,
        nextStatus,
        parseQueue,
        setQueueState,
        createQueueTaskStatus,
        queueId,
        filter
      );
  }
};
