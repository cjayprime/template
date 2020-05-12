import QUEUE_STATE, {
  ACCEPTED,
  ACCEPT,
  NOT_OWNER,
  EPID_SURVEILLANCE,
  NO_STATUS,
  RRT
} from 'bundles/queue/utilities/stateTransition';
import { parseRRT } from 'bundles/queue/utilities/rrt';
import { parseEpidSurveillance } from 'bundles/queue/utilities/epidSurveillance';

// export const getAge = dateString => { // Get Age
//   if (!dateString) return null;
//   const today = new Date();
//   const birthDate = new Date(dateString);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// export const parseStatus = user => { // Get user status
//   if (
//     user.queueTaskStatusesByTaskId &&
//     user.queueTaskStatusesByTaskId.nodes
//   ) {
//     if (user.queueTaskStatusesByTaskId.nodes.length > 0) {
//       return user.queueTaskStatusesByTaskId.nodes[
//         user.queueTaskStatusesByTaskId.nodes.length - 1
//       ].status;
//     }
//   }

//   return user.patientByPatientId.patientCasesByPatientId.nodes.status;
// };

// export const remap = (user, tableStatus, action) => ({  // Map user to defined Table  for queues
//   patient: {
//     firstName: user.patientByPatientId.firstname,
//     epidNumber: user.patientByPatientId.epidNumber,
//     id: user.nodeId,
//     patientId: user.patientByPatientId.id,
//     queueId: user.id,
//     lastName: user.patientByPatientId.lastname,
//     sex: user.patientByPatientId.sex,
//     age: getAge(user.patientByPatientId.birthDate),
//     requestDate: new Date(user.requestDate).toDateString(),
//     status: parseStatus(user),
//     riskLevel:
//       user.patientByPatientId.patientCasesByPatientId.nodes.riskLevel,
//     team: user.team,
//     action,
//     acceptedBy: user?.userByAcceptedBy?.firstname || '-',
//     tableStatus
//   }
// });

// export const addQueueStatus = async ({ type, status, id }) => {  // Add queue status
//   const response = await createQueueTaskStatus({
//     variables: {
//       input: {
//         queueTaskStatus: {
//           taskType: type,
//           status,
//           queue: {
//             connectById: {
//               id: id
//             }
//           }
//         }
//       }
//     }
//   });

//   if (response) return true;
//   else return false;
// };

// export const labRequest = async ({ notes, user, requestDate, patientId }) => { // Create lab request
//   const response = await createLabRequest({
//     variables: {
//       input: {
//         labRequest: {
//           requestedBy: user,
//           testName: 'Covid 19',
//           sampleNumber: Math.floor(Math.random() * 999999),
//           specimenNotes: notes,
//           requestDate,
//           patient: {
//             connectById: {
//               id: patientId
//             }
//           }
//         }
//       }
//     }
//   });

//   if (response) {
//     console.log('Succes');
//     return true;
//   } else {
//     console.log('Failed', response);
//     return false;
//   }
// };

// export const addToQueue = async ({ patientEpidNumber, id, team }) => { // Add to queue
//   const response = await addQueue({
//     variables: {
//       input: {
//         queue: {
//           patientEpidNumber,
//           patientId: id,
//           team
//         }
//       }
//     }
//   });

//   if (response) {
//     return true;
//   }

//   return false;
// };

// export const dispatchEvent = async (id, status, patient) => { // Update queue
//   const response = await updateQueue({
//     variables: {
//       input: {
//         nodeId: id,
//         queuePatch: {
//           acceptedBy: 1
//         }
//       },
//       filter: {
//         or: [
//           {
//             team: {
//               equalTo: 'Evac & Decon'
//             }
//           },
//           {
//             team: {
//               equalTo: 'EPID/Surveillance'
//             }
//           },
//           {
//             team: {
//               equalTo: 'RRT'
//             }
//           }
//         ]
//       }
//     }
//   });

//   if (response) {
//     const queues = response?.data?.updateQueue?.query?.allQueues.nodes;
//     const { accepted, owner, pending } = parseQueue(queues);
//     setQueueState({ accepted, owner, pending });
//     return true;
//   }

//   return false;
// };

// export const bookAppointment = async (patient, status) => { // book apointment

//   if (patient.team == 'RRT') {
//     if (patient.status == 'Sample Collected') {
//       const labs = await labRequest({
//         notes: 'Sent from RRT',
//         user: 1,
//         requestDate: new Date(),
//         patientId: patient.patientId
//       });
//       if (labs) {
//         console.log('Labs came back succesfully');
//         const response = await handleRRT(patient, 'Sample Delivered');
//         if (response) console.log('Response recieved, -->', response);
//       }
//       return;
//     }

//     const response = await handleRRT(patient, status);
//     console.log('On back-->', response);
//     return;
//   }

//   setPatientInfo({ ...patient });
//   setDialogState(!dialogState);
// };

// const handleSave = async () => {
//   // EPID / SURVELLENCE
//   const { epidNumber, id, patientId, queueId } = patientInfo;
//   const { reason, team, time, date } = formState;

//    if(patientInfo.team == 'Evac & Decon') {

//       if (date && time) {
//               // Complete evac and decon
//       }

//       return;
//    }

//   if (!team || !time || !date) {
//     return;

//   } else {

//     if (patientInfo.team == 'Psychosocial') {
//       const queueAdded = await addToQueue({
//           patientEpidNumber: epidNumber,
//           id: patientId,
//           team
//         });
//         console.log(queueAdded, '-----> returned as Queue added');
//         if(queueAdded) {
//         const addTask = await addQueueStatus({
//           id: queueId,
//           status: 'Appointment Booked',
//           type: 'TEAM_TASK'
//         });

//         console.log('Add Task as ', addTask);
//       }

//         return;
//     }

//     //Epid
//     // as epid survelance
//     if (reason == 'Drive through') {
//       const labs = await labRequest({
//         notes: reason || '',
//         user: 1,
//         requestDate: date,
//         patientId
//       });
//       if (labs) {
//         const addTask = await addQueueStatus({
//           id: queueId,
//           status: 'Appointment Booked',
//           type: 'TEAM_TASK'
//         });
//       }
//     } else {
//       const labs = await labRequest({
//         notes: reason || '',
//         user: 1,
//         requestDate: date,
//         patientId
//       });
//       console.log(labs, '-----> returned as Labs');

//       const queueAdded = await addToQueue({
//         patientEpidNumber: epidNumber,
//         id: patientId,
//         team
//       });
//       console.log(queueAdded, '-----> returned as Queue added');
//       const addTask = await addQueueStatus({
//         id: queueId,
//         status: 'Appointment Booked',
//         type: 'TEAM_TASK'
//       });

//       console.log('Add Task as ', addTask);
//     }
//   }
//   setDialogState(!dialogState);
// };

// const saveEntry = value => {
//   setFormState({ ...formState, ...value });
// };

// const userOwnsTask = current =>
//   current?.userByAcceptedBy?.firstname == 'Jola';

// const parseQueue = queue => {
//   return queue.reduce(
//     (acc, current) => {
//       const accepted = current.userByAcceptedBy;

//       if (accepted) {
//         if (userOwnsTask(current))
//           acc['owner'].push(remap(current, 'Accepted', bookAppointment));
//         else acc['accepted'].push(remap(current, 'Not Owned', dispatchEvent));
//       } else {
//         acc['pending'].push(remap(current, 'Pending', dispatchEvent));
//       }

//       return acc;
//     },
//     { accepted: [], owner: [], pending: [] }
//   );
// };



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
