import React, { Fragment, useState, useEffect } from 'react';
import withQueue from 'bundles/queue/hoc/withQueue';
import createRequestLab from 'bundles/lab/hoc/createLabRequest';
import createQueue from 'bundles/queue/hoc/createQueue';
import createQueueTask from 'bundles/queue/hoc/createQueueTask';
import updateQueue from 'bundles/queue/hoc/updateQueue';
import { QueueTableView } from './Views/QueueTable';
import { makeStyles } from '@material-ui/styles';
import PatientDialog from 'bundles/queue/components/Views/QueueTable/dialog';
import Appointment from 'bundles/appointment/components/create';
const compose = require('lodash')?.flowRight;

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const Queue = ({
  queues,
  addQueue,
  updateQueue,
  createLabRequest,
  createQueueTaskStatus
}) => {
  const classes = useStyles();
  const [queueState, setQueueState] = useState({});
  const [dialogState, setDialogState] = useState(false);
  const [patientInfo, setPatientInfo] = useState({});
  const [formState, setFormState] = useState({});
  const [queueDropDown, setQueueDropDown] = useState({
    'EPID/Surveillance': ['RRT'],
    'Psychosocial': ['Evac & Decon'],
    'Evac & Decon': []
  });

  const getAge = dateString => { // Get Age
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

  const remap = (user, tableStatus, action) => ({  // Map user to defined Table  for queues
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
        user.patientByPatientId.patientCasesByPatientId.nodes.riskLevel,
      team: user.team,
      action,
      acceptedBy: user?.userByAcceptedBy?.firstname || '-',
      tableStatus
    }
  });

  const addQueueStatus = async ({ type, status, id }) => {  // Add queue status
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
        }
      }
    });

    if (response) return true;
    else return false;
  };

  const labRequest = async ({ notes, user, requestDate, patientId }) => { // Create lab request
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

    if (response) {
      console.log('Succes');
      return true;
    } else {
      console.log('Failed', response);
      return false;
    }
  };

  const addToQueue = async ({ patientEpidNumber, id, team }) => { // Add to queue
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

  const dispatchEvent = async (id, status, patient) => { // Update queue
    const response = await updateQueue({
      variables: {
        input: {
          nodeId: id,
          queuePatch: {
            acceptedBy: 1
          }
        },
        filter: {
          or: [
            {
              team: {
                equalTo: 'Evac & Decon'
              }
            },
            {
              team: {
                equalTo: 'EPID/Surveillance'
              }
            },
            {
              team: {
                equalTo: 'RRT'
              }
            }
          ]
        }
      }
    });

    if (response) {
      const queues = response?.data?.updateQueue?.query?.allQueues.nodes;
      const { accepted, owner, pending } = parseQueue(queues);
      setQueueState({ accepted, owner, pending });
      return true;
    }

    return false;
  };

  const bookAppointment = async (patient, status) => { // book apointment
    if (patient.team == 'RRT') {
      if (patient.status == 'Sample Collected') {
        const labs = await labRequest({
          notes: 'Sent from RRT',
          user: 1,
          requestDate: new Date(),
          patientId: patient.patientId
        });
        if (labs) {
          console.log('Labs came back succesfully');
          const response = await handleRRT(patient, 'Sample Delivered');
          if (response) console.log('Response recieved, -->', response);
        }
        return;
      }

      const response = await handleRRT(patient, status);
      console.log('On back-->', response);
      return;
    }

    setPatientInfo({ ...patient });
    setDialogState(!dialogState);
  };

  const handleRRT = async (patient, status) => {
    const { epidNumber, id, patientId, queueId } = patient;

    const response = await addQueueStatus({
      id: queueId,
      status: status,
      type: 'TEAM_TASK'
    });

    if (response) {
      console.log('Succes ', response);
    }
  };

  const handleSave = async () => {
    // EPID / SURVELLENCE
    const { epidNumber, id, patientId, queueId } = patientInfo;
    const { reason, team, time, date } = formState;



     if(patientInfo.team == 'Evac & Decon') {

        if (date && time) {
                // Complete evac and decon
        } 

        return;
     }

    if (!team || !time || !date) {
      return;
    
    } else {

      if (patientInfo.team == 'Psychosocial') {
        const queueAdded = await addToQueue({
            patientEpidNumber: epidNumber,
            id: patientId,
            team
          });
          console.log(queueAdded, '-----> returned as Queue added');
          if(queueAdded) {
          const addTask = await addQueueStatus({
            id: queueId,
            status: 'Appointment Booked',
            type: 'TEAM_TASK'
          });
  
          console.log('Add Task as ', addTask);
        }

          return;
      }
      // as epid survelance
      if (reason == 'Drive through') {
        const labs = await labRequest({
          notes: reason || '',
          user: 1,
          requestDate: date,
          patientId
        });
        if (labs) {
          const addTask = await addQueueStatus({
            id: queueId,
            status: 'Appointment Booked',
            type: 'TEAM_TASK'
          });
        }
      } else {
        const labs = await labRequest({
          notes: reason || '',
          user: 1,
          requestDate: date,
          patientId
        });
        console.log(labs, '-----> returned as Labs');

        const queueAdded = await addToQueue({
          patientEpidNumber: epidNumber,
          id: patientId,
          team
        });
        console.log(queueAdded, '-----> returned as Queue added');
        const addTask = await addQueueStatus({
          id: queueId,
          status: 'Appointment Booked',
          type: 'TEAM_TASK'
        });

        console.log('Add Task as ', addTask);
      }
    }
    setDialogState(!dialogState);
  };

  const saveEntry = value => {
    setFormState({ ...formState, ...value });
  };

  const userOwnsTask = current =>
    current?.userByAcceptedBy?.firstname == 'Jola';

  const parseQueue = queue => {
    return queue.reduce(
      (acc, current) => {
        const accepted = current.userByAcceptedBy;

        if (accepted) {
          if (userOwnsTask(current))
            acc['owner'].push(remap(current, 'Accepted', bookAppointment));
          else acc['accepted'].push(remap(current, 'Not Owned', dispatchEvent));
        } else {
          acc['pending'].push(remap(current, 'Pending', dispatchEvent));
        }

        return acc;
      },
      { accepted: [], owner: [], pending: [] }
    );
  };

  useEffect(() => {
    const { accepted, owner, pending } = parseQueue(queues);

    if (queues.length > 0) {
      setQueueState({ accepted, owner, pending });
    }
  }, [queues]);

  if (!queues) return null; // Should be loader

  return (
    <Fragment>
      <QueueTableView
        accepted={queueState.accepted || []}
        owner={queueState.owner || []}
        pending={queueState.pending || []}
      />
      <PatientDialog
        open={dialogState}
        handleClose={setDialogState}
        render={
          <Appointment
            data={patientInfo}
            save={handleSave}
            handleClose={setDialogState}
            items={queueDropDown['Evac & Decon']} // Should be team
            reason={['Drive through', 'Home pick up']}
            formState={formState}
            setFormState={saveEntry}
          />
        }
      />
    </Fragment>
  );
};

export default compose(
  withQueue,
  createQueue,
  createQueueTask,
  updateQueue,
  createRequestLab
)(Queue);
