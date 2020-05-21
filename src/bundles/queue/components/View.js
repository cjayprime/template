import React, { Fragment, useState, useEffect } from 'react';
import withQueue from 'bundles/queue/hoc/withQueue';
import createRequestLab from 'bundles/lab/hoc/createLabRequest';
import withLocations from 'bundles/location/hoc/withLocation';
import createPatientLocation from 'bundles/location/hoc/createPatientLocation';
import createQueue from 'bundles/queue/hoc/createQueue';
import createQueueTask from 'bundles/queue/hoc/createQueueTask';
import updateQueue from 'bundles/queue/hoc/updateQueue';
import { QueueTableView } from './Views/QueueTable';
import { makeStyles } from '@material-ui/styles';
import PatientDialog from 'bundles/queue/components/Views/QueueTable/dialog';
import Appointment from 'bundles/appointment/components/create';
import { connect } from 'react-redux';
import { searchFilter } from 'bundles/queue/selectors';
import { addBedLocation } from 'bundles/location/actions';
import { dispatchEvent, remap } from 'bundles/queue/utilities/queue';
import { useSubscription } from '@apollo/react-hooks';
import { QUEUE_SUBSCRIPTION } from 'graphql/Subscription/queueSubscription';
const compose = require('lodash')?.flowRight;

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
 
const Queue = ({
  addQueue,
  locationData,
  updateQueue,
  createLabRequest,
  createQueueTaskStatus,
  queues,
  filter,
  queueFilter,
  addBed,
  createPatientLocation, 
  ...props
}) => {
    
  const classes = useStyles();
  // const subs = useSubscription(QUEUE_SUBSCRIPTION, { 
  //   onSubscriptionData: (e) => {
  //     console.log(e.subscriptionData)
  //   }, 
  //  })
  const [queueState, setQueueState] = useState({});
  const [dialogState, setDialogState] = useState(false);
  const [patientInfo, setPatientInfo] = useState({});
  const [formState, setFormState] = useState({});
  const [apiData, setSaveApiData] = useState(() => ''); 
  // const data = withQueueHoc()


  const handleSave = async (queueText, locationId) => {
  
    const { reason, team, time, date  } = formState;
    /*if (!date)  {  // Validation should be done from inside comp  //Evac and decon does not need team
        console.log('All fields are reqired')
        return null
    } */

    dispatchEvent({ patient: { ...patientInfo, reason, date, newTeam: team, locationId, admittedBy: 1 } }, queueText, { 
        updateQueue, 
        createLabRequest, 
        addQueue,
        createQueueTaskStatus, 
        filter : queueFilter, 
        parseQueue, 
        setQueueState ,
        setPatientInfo,
        setDialogState,
        setSaveApiData,
        createPatientLocation, 
    })

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
            acc['owner'].push(remap(current, 'Accepted', () => ''));
          else acc['accepted'].push(remap(current, 'Not Owned', () => ''));
        } else {
          acc['pending'].push(remap(current, 'Pending', () => ''));
        }

        return acc;
      },
      { accepted: [], owner: [], pending: [] }
    );
  };

  useEffect(() => {
    const { accepted, owner, pending } = parseQueue(queues);

    if(locationData.length) {
        addBed(locationData);
    }

    if (queues.length > 0) {
      setQueueState({ accepted, owner, pending });
    }
  }, [queues, locationData]);

  if (!queues) return null; // Should be loader

  return (
    <Fragment>
      <QueueTableView
        accepted={queueState.accepted || []}
        owner={queueState.owner || []}
        pending={queueState.pending || []}
        apiCalls={{ updateQueue, 
            createLabRequest, 
            createQueueTaskStatus, 
            filter: queueFilter, 
            addQueue,
            parseQueue, 
            setQueueState ,
            setPatientInfo,
            setDialogState,
            setSaveApiData,
            createPatientLocation,
        }}   
      />
      <PatientDialog
        open={dialogState}
        handleClose={setDialogState}
        render={
          <Appointment
            data={patientInfo}
            save={handleSave}
            handleClose={setDialogState}
            items={[]} // Set from inside the component
            reason={[]}
            formState={formState}
            setFormState={saveEntry}
          />
        }
      />
    </Fragment>
  );
};

const parseFilter = (array = []) => {
    const mappedFilters = array.map(data => {
        return {
          team: {
            equalTo: data
          }
        }
    });
 
    return { or: [...mappedFilters]}
}

const mapDispatchToProps = dispatch => ({
    addBed: value => dispatch(addBedLocation(value))
});

const mapStateToProps = state => ({
    queueFilter: parseFilter(searchFilter.getTeam(state)?.toJS())
});

export default compose(
  connect(mapStateToProps ,mapDispatchToProps),
  withQueue,
  createQueue,
  createPatientLocation,
  createQueueTask,
  withLocations,
  updateQueue,
  createRequestLab
)(Queue);
 