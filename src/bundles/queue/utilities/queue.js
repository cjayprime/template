import QUEUE_STATE, {
  ACCEPTED,
  ACCEPT,
  NOT_OWNER,
  EPID_SURVEILLANCE,
  NO_STATUS,
  RRT,
  PSYCHOSOCIAL,
  EVAC_AND_DECON
} from 'bundles/queue/utilities/stateTransition';
import { parseRRT } from 'bundles/queue/utilities/rrt';
import { parseEpidSurveillance } from 'bundles/queue/utilities/epidSurveillance';
import { parsePyschosocial } from 'bundles/queue/utilities/pyschosocial';
import { parseEvacAndDecon } from 'bundles/queue/utilities/evacDecon';


 export const getAge = dateString => { // Get Age
  if (!dateString) return null;
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

 const parseStatus = user => { // Get user status
  if (
    user.queueTaskStatusesByTaskId &&
    user.queueTaskStatusesByTaskId.nodes
  ) {
    if (user.queueTaskStatusesByTaskId.nodes.length > 0) {
      return user.queueTaskStatusesByTaskId.nodes[
        user.queueTaskStatusesByTaskId.nodes.length - 1
      ].status;
    }
  }

  return user.patientByPatientId.patientCasesByPatientId.nodes.status;
};

export const remap = (user, tableStatus, action) => ({  // Map user to defined Table  for queues
  patient: {
    firstName: user.patientByPatientId.firstname,
    epidNumber: user.patientByPatientId.epidNumber,
    id: user.nodeId,
    patientId: user.patientByPatientId.id,
    queueId: user.id,
    lastName: user.patientByPatientId.lastname,
    sex: user.patientByPatientId.sex,
    age: getAge(user.patientByPatientId.birthDate),
    requestDate: new Date(user.requestDate).toDateString(),
    status: parseStatus(user),
    riskLevel:
      user.patientByPatientId.patientCasesByPatientId.nodes.length > 0 ? user.patientByPatientId.patientCasesByPatientId.nodes[0].riskLevel : undefined,
    team: user.team,
    action,
    acceptedBy: user?.userByAcceptedBy?.firstname || '-',
    tableStatus
  }
});

  
const requestNewDataAfterUpdate = (response, parseQueue, setQueueState) => {
    const queues = response?.query?.allQueues.nodes;
    const { accepted, owner, pending } = parseQueue(queues);
    setQueueState({ accepted, owner, pending });
    return true
}

export const addLabRequest = async ({ notes, user, requestDate, patientId, createLabRequest }) => { // Create lab request
  const response = await createLabRequest({
    variables: {
      input: {
        labRequest: {
          requestedBy: user,
          testName: 'Covid 19',
          sampleNumber: Math.floor(Math.random() * 999999),
          specimenNotes: notes,
          requestDate,
          patient: {
            connectById: {
              id: patientId
            }
          }
        }
      }
    }
  });

  if(response) {
    return true
  }

  return false

};

export const addToQueue = async ({ patientEpidNumber, id, team , addQueue}) => { // Add to queue
   
  const response = await addQueue({
    variables: {
      input: {
        queue: {
          patientEpidNumber,
          patientId: id,
          team
        }
      }
    }
  });

  if (response) {
    return true;
  }

  return false;
};

export const addPatientLocation = async (patientId, locationId, status, admittedBy, createPatientLocation) => {
  const response = await createPatientLocation({
    variables: {
      input: {
        patientLocation : {
          patientId,
          locationId,
          dateAdmitted: new Date(),
          status,
          admittedBy
        }
      }
    }
  })

  if(response) return true

  return false
}

const updateStatus = async (
  id,
  updateQueue,
  filter,
  parseQueue,
  setQueueState
) => {
  const response = await updateQueue({
    variables: {
      input: {
        nodeId: id,
        queuePatch: {
          acceptedBy: 1
        }
      },
      filter: { ...filter }
    }
  });

  if (response) {
    requestNewDataAfterUpdate(response?.data?.updateQueue, parseQueue, setQueueState)
    return true;
  }

  return false;
}; 

export const addQueueStatus = async ({ type, status, id, createQueueTaskStatus, filter,
  parseQueue,
  setQueueState }) => {  // Add queue status

  const response = await createQueueTaskStatus({
    variables: {
      input: {
        queueTaskStatus: {
          taskType: type,
          status,
          queue: {
            connectById: {
              id: id
            }
          }
        }
      },
      filter: { ...filter } 
    }
  });

  if (response) {
    requestNewDataAfterUpdate(response?.data?.createQueueTaskStatus, parseQueue, setQueueState)
    return true;
  }
  else return false;
};


export const filterEvent = (row, action, api) => { 
 
  const { patient: { id } } = row
  const { updateQueue, filter, parseQueue, setQueueState } = api
   
  switch(action) {
    case ACCEPT: updateStatus(id, updateQueue, filter, parseQueue, setQueueState)
  }
}

const findNextStateFromValue = (row, action) => { // This state is in charge of adding the next state
  const {
    patient: { team }
  } = row;

  return Object.keys(QUEUE_STATE[team]).reduce((acc, curr) => {
    
    if(QUEUE_STATE[team][curr].text === action)
       acc = QUEUE_STATE[team][curr].nextState

    return acc
  }, '');
};

export const dispatchEvent = (row, action, api) => {
  const {
    patient: { team }
  } = row;


  const nextState = findNextStateFromValue(row, action) // We use next state to know the next action

  switch (team) {
    case RRT: parseRRT(row, action, api, nextState)

    case EPID_SURVEILLANCE: parseEpidSurveillance(row, action, api, nextState)

    case PSYCHOSOCIAL: parsePyschosocial(row, action, api, nextState)

    case EVAC_AND_DECON: parseEvacAndDecon(row, action, api, nextState)

    default: filterEvent(row, action, api, nextState);
  }

};

export const isRequestAccepted = row => {
  const {
    patient: { tableStatus }
  } = row;

  if (tableStatus == ACCEPTED || tableStatus == NOT_OWNER) return true;

  return false;
};

/*
  Check if request has been accepted and display status
  We have instances where a queue is request and status filled
  E.g A result is positive, Lab request sends queue to Psychosocial 
  and adds book apointment to the patients status.
*/
export const statusIfRequestAccepted = row => {
  const {
    patient: { team }
  } = row;

  if (isRequestAccepted(row)) return QUEUE_STATE[team][ACCEPTED].defaultStatus;

  return NO_STATUS;
};
