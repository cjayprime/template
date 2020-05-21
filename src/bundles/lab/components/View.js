import React, { Fragment, useState, useEffect } from 'react';
import { Button, Chip, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import withLabRequests from 'bundles/lab/hoc/withLabRequest';
import createLabRequestStatus from 'bundles/lab/hoc/createLabRequestStatus';
import createQueue from 'bundles/queue/hoc/createQueue';
import updateLabRequestLab from 'bundles/lab/hoc/updateLabRequest';
import createQueueTask from 'bundles/queue/hoc/createQueueTask';
import updateQueue from 'bundles/queue/hoc/updateQueue';
import ExpanderComponent from 'bundles/lab/components/ExpanderComponent';
import sendSMS from 'bundles/sms/hoc/sendSms'
import { DataTable, Header } from '../../../bundles/shared/components';

const compose = require('lodash')?.flowRight;

const useStyles = makeStyles(theme => ({
  tableTitle: {
    color: 'white'
  },
  tableContainer: {
    marginBottom: theme.spacing(6)
  },
  actionButton: {
    color: '#80C9CE',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  form: {
    width: '100%',
    padding: 10
  },
  formButton: {
    boxShadow: 'none',
    borderRadius: 20,
    textTransform: 'none',
    border: 'none',
    color: 'white',
    lineHeight: 1.5,
    fontSize: 16,
    padding: '10px 50px 10px'
  },
  formButtonTS: {
    backgroundColor: '#80C9CE',
    '&:hover': {
      backgroundColor: '#80C9CE',
      border: 'none',
      boxShadow: 'none'
    },
    '&:active': {
      backgroundColor: '#80C9CE',
      border: 'none',
      boxShadow: 'none'
    }
  }
}));

const LabRequest = ({
  queues,
  addQueue,
  updateQueue,
  createLabRequest,
  createQueueTaskStatus,
  createLabRequestStatus,
  sendSms,
  labRequests,
  updateLabRequest
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [labState, setLabState] = useState({});

  useEffect(() => {
    const { accepted, owner, pending } = parseQueue(labRequests);

    if (labRequests.length > 0) { 
      setLabState({ accepted, owner, pending });
    }
  }, [labRequests]);

  const handleChange = newValue => {
    setValue(newValue);
  };


  const requestNewDataAfterUpdate = (response) => {
    const labs = response?.query?.allLabRequests.nodes;
    const { accepted, owner, pending } = parseQueue(labs);
    setLabState({ accepted, owner, pending });
    return true
} 

  const addToQueue = async ({ patientEpidNumber, id, team }) => {
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

  const addLabRequestStatus = async ({ status, id }) => {
    const response = await createLabRequestStatus({
      variables: {
        input: {
          labRequestStatus: {
            status,
            labRequest: {
              connectById: {
                id
              }
            }
          }
        }
      }
    });

    if (response) {
      console.log(response, '----> worked in lab request');
      requestNewDataAfterUpdate(response?.data?.createLabRequestStatus)
      return true;
    } else {
      console.log('response failed');
      return false;
    }
  };

  const updateResult = async ({ nodeId, result }) => {
    const response = await updateLabRequest({
      variables: {
        input: {
          nodeId,
          labRequestPatch: {
            result
          }
        }
      }
    });

    if (response) {
      console.log('Response is true');
      return true;
    }
    return false;
  };

  const updateLabRequestSpecimen = async ({ type, notes, nodeId }) => {

    const response = await updateLabRequest({
      variables: {
        input: {
          nodeId,
          labRequestPatch: {
            sampleCollectionDate: new Date(),
            specimenType: type,
            specimenNotes: notes,
            acceptedBy: 1
          }
        }
      }
    });

    if (response) {
      console.log('Succes', response);
      return true;
    } else {
      console.log('Failed');
      return false;
    }
  };

  const addSpecimenNote = async data => {
    const key = parseInt(
      Object.keys(data)
        .join('')
        .split('-')[0]
    );

    const specimenType = data[`${key}-specimen`];
    const notes = data[`${key}-notes`];
    const nodeId = data[`${key}-nodeId`];

    if (specimenType && notes) {
      const response = await updateLabRequestSpecimen({
        type: specimenType,
        notes,
        nodeId
      });

      if (response) {
        console.log('success');
        const labRequest = await addLabRequestStatus({
          id: key,
          status: 'Awaiting tests result'
        });

        if (labRequest) {
          console.log('Lab requests seen');
        }
      } else {
        console.log('Failed');
      }
    }
  };

  const saveResult = async data => {
    const key = parseInt(
      Object.keys(data)
        .join('')
        .split('-')[0]
    );

    const result = data[`${key}-result`];
    const nodeId = data[`${key}-nodeId`];
    const labId = data[`${key}-id`];

    const { epidNumber, id, phoneNumber } = data['row'].patientByPatientId;

    const response = await updateResult({
      nodeId,
      result
    });

    if (response) {
      const labRequest = await addLabRequestStatus({
        id: labId,
        status: 'Completed'
      });

      console.log('Lab Request', labRequest);

      if (labRequest && result == 'POSITIVE') {
        const queueAdd = addToQueue({
          patientEpidNumber: epidNumber,
          id,
          team: 'Psychosocial'
        });
        if (queueAdd) {
        }
      } else {  
        const response = await sendSms({
          variables: {
            input: {
                name: 'John Doe',
                phoneNumber: phoneNumber,
                message: 'Covid 19 Result came back Negative'
            }
          }
      });

      }
    }
  };

  const addQueueStatus = async ({ type, status, id }) => {
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
        filter: {
          or: [
            {
              id: {
                greaterThan: 0
              }
            }
          ]
        }
      }
    });

    if (response) return true;
    else return false;
  };

  const dispatchFunction = async (e, row, status) => {
    e.stopPropagation();
    const {
      id,
      patientByPatientId: {
        queuesByPatientId: { nodes }
      }
    } = row;

    if (nodes.length > 0) {
      const response = await addQueueStatus({
        type: 'LAB_REQUEST',
        id: nodes[nodes.length - 1].id,
        status
      });

      if (response) {
        console.log('Response == true');

        const labRequest = await addLabRequestStatus({
          id,
          status
        });

        if (labRequest) {
          console.log('Success');
        }
      }
    } else {
      alert('Missing queue');
      const labRequest = await addLabRequestStatus({
        id,
        status
      });
      if (labRequest) {
        console.log('Success');
      }
    }
  };


  const renderActionComponent = row => {
    if (row.status === 'Completed') {
      return (
        <Button onClick={e => {}} className={classes.actionButton}></Button>
      );
    }

    if (row.status === 'Awaiting tests result') {
      return (
        <Button onClick={e => {}} className={classes.actionButton}>
          
        </Button>
      );
    }

    if (row.status === 'No results submitted') {
      return (
        <Button
          onClick={e => row.action(e, row, 'Awaiting tests result')}
          className={classes.actionButton}>
          Start Testing
        </Button>
      );
    }
    return (
      <Button
        onClick={e => row.action(e, row, 'No results submitted')}
        className={classes.actionButton}>
        Recieve Specimen
      </Button>
    );
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}>
        {value === index && <Fragment> {children} </Fragment>}
      </div>
    );
  }

  const renderIconComponent = row => <KeyboardArrowDown />;

  const renderStatusComponent = row => (
    <Chip label={row.status} variant="default" size="small" />
  );

  if (!labRequests) return null;

 
  const remap = item => ({
    ...item,
    status:
      item.labRequestStatusesByLabRequestId?.nodes?.length > 0
        ? item.labRequestStatusesByLabRequestId?.nodes[
            item.labRequestStatusesByLabRequestId?.nodes?.length - 1
          ].status
        : 'Awaiting Sample',
    action: dispatchFunction,
    requestedBy:
      item.userByRequestedBy?.firstname +
      ' ' +
      item.userByRequestedBy?.lastname,
    requestDate: new Date(item.requestDate).toDateString()
  });

  const userOwnsTask = current =>
    current?.userByAcceptedBy?.firstname == 'Jola';

  const parseQueue = queue => {
    return queue.reduce(
      (acc, current) => {
        const accepted = current.userByAcceptedBy;

        if (accepted) {
          if (userOwnsTask(current)) acc['owner'].push(remap(current));
          else acc['accepted'].push(remap(current));
        } else {
          acc['pending'].push(remap(current));
        }

        return acc;
      },
      { accepted: [], owner: [], pending: [] }
    );
  };

  const headers = [
    { name: 'SAMPLE NO.', accessor: 'sampleNumber' },
    { name: 'REQUEST DATE', accessor: 'requestDate' },
    { name: 'NAME OF TEST', accessor: 'testName' },
    { name: 'STATUS', accessor: renderStatusComponent },
    { name: 'REQUESTED BY', accessor: 'requestedBy' },
    { name: 'ACTION', accessor: renderActionComponent },
    { name: '', accessor: renderIconComponent }
  ];

  // const { owner, accepted, pending } = parseQueue(labRequests);

  const accepted = labState?.accepted || []
  const owner = labState?.owner || []
  const pending = labState?.pending || []

  return (
    <Fragment>
      <Header
        pageTitle="Lab Requests"
        contexts={{
          tabs: {
            tabItems: ['All Requests', 'My Lab Requests'],
            defaultTab: 'All Requests',
            handleTabChange: _selectedTab => {
              handleChange(_selectedTab);
            }
          },
          dateSelect: {
            defaultValue: 'TODAY',
            options: ['TODAY', 'YESTERDAY'],
            handleInputChange: _newInput => {}
          },
          search: {
            handleInputChange: _newValue => {},
            placeholder: 'Search by sample no.'
          }
        }}
      />
      <div>
        <TabPanel value={value} index={0}>
          <div className={classes.tableContainer}>
            <Grid container>
              <Typography className={classes.tableTitle}>
                {`${pending.length} Pending Lab Requests`}
              </Typography>
            </Grid>
            <DataTable
              headers={headers}
              data={pending}
              renderCollapsible={row => (
                <ExpanderComponent
                  row={row}
                  classes={classes}
                  saveNote={addSpecimenNote}
                  saveResult={saveResult}
                />
              )}
            />
          </div>
          <div className={classes.TableContainer}>
            <Typography className={classes.tableTitle}>
              {`${accepted.length + owner.length} Accepted Lab Requests`}
            </Typography>
            <DataTable headers={headers} data={[...accepted, ...owner]} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.tableContainer}>
            <Typography className={classes.tableTitle}>{`${owner.length +
              accepted.length} Accepted Request`}</Typography>
            <DataTable
              headers={headers}
              data={[...owner, ...accepted]}
              renderCollapsible={row => (
                <ExpanderComponent
                  row={row}
                  classes={classes}
                  saveNote={addSpecimenNote}
                  saveResult={saveResult}
                />
              )}
            />
          </div>
        </TabPanel>
      </div>
    </Fragment>
  );
};

export default compose(
  createQueue,
  createQueueTask,
  createLabRequestStatus,
  updateLabRequestLab,
  withLabRequests,
  sendSMS,
  updateQueue
)(LabRequest); 
