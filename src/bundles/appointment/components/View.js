import React, { Fragment, useState } from 'react';
import { Grid, ButtonBase, Chip } from '@material-ui/core';
import withQueueStatusAppointment from 'bundles/appointment/hoc/withQueueStatusAppointment';

import { getAge } from 'bundles/queue/utilities/queue';
import { Link } from 'react-router-dom';
import { capitalizeFirstWord } from 'bundles/patient/components/custom/formBuilder';
import { BedListPageStyles } from 'bundles/bedmanagement/components/Views/BedListPage/index.style';
// import { remap } from 'bundles/queue/utilities/queue';
import { Header, DataTable, PatientMetadatum } from 'bundles/shared/components';
const compose = require('lodash')?.flowRight;

const View = ({ queueTask, labTask }) => {
  const [value, setValue] = useState(0);

  const classes = BedListPageStyles();

  const handleChange = newValue => {
    setValue(newValue)
  };

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


const remapLab = (user) => ({
    patient: {
        firstName: user.labRequestByLabRequestId.patientByPatientId.firstname,
        lastName: user.labRequestByLabRequestId.patientByPatientId.lastname,
        sex: user.labRequestByLabRequestId.patientByPatientId.sex,
        age: getAge(user.labRequestByLabRequestId.patientByPatientId.birthDate),
        requestDate: new Date(user.stateChangeDate).toDateString(),
        status: user.status,
        team: 'Lab',
        riskLevel: user.labRequestByLabRequestId.patientByPatientId.patientCasesByPatientId.nodes.length > 0 ? 
        user.labRequestByLabRequestId.patientByPatientId.patientCasesByPatientId.nodes[0].riskLevel : undefined
    }
})
  
 const remap = (user) => ({  // Map user to defined Table  for queues
    patient: {
      firstName: user.queueByTaskId.patientByPatientId.firstname,
      epidNumber: user.queueByTaskId?.patientByPatientId?.epidNumber,
      id: user.nodeId,
      patientId: user.queueByTaskId?.patientByPatientId?.id,
      queueId: user.id,
      lastName: user.queueByTaskId?.patientByPatientId?.lastname,
      sex: user.queueByTaskId?.patientByPatientId?.sex,
      age: getAge(user.queueByTaskId?.patientByPatientId?.birthDate),
      requestDate: new Date(user.queueByTaskId.requestDate || user.queueByTaskId.scheduledDate).toDateString(),
      status: user.status,
      riskLevel:
        user.queueByTaskId?.patientByPatientId?.patientCasesByPatientId?.nodes.length > 0 ? 
        user.queueByTaskId.patientByPatientId.patientCasesByPatientId.nodes[0].riskLevel : undefined,
      team: user.queueByTaskId.team,
    }
  });

  const parseQueue = (queue, type) => {
    return queue.reduce(
      (acc, current) => {       
        if (!type) acc.push(remap(current))

        else acc.push(remapLab(current))

        return acc;
      },
     []
    );
  };



  const formattedData = parseQueue(queueTask)
  const formatLab = parseQueue(labTask, 'Lab')
 

  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstName || ''} ${row.patient.lastName || ''}`}
      sex={row.patient.sex ? row.patient.sex.toLowerCase() : ''}
      age={row.patient.age || ''}
      textRowDirection={'row'}
      riskLevel={
        row.patient.riskLevel
          ? capitalizeFirstWord(row.patient.riskLevel)
          : 'No '
      }
    />
  );

  const renderChipComponent = row => (
    <Chip
      variant="default"
      size="small"
      label={row.patient.status}
      style={{
        height: '18px',
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        maxWidth: '150px'
      }}
    />
  );

  const tableHeaders = [
    { name: 'DATE', accessor: 'patient.requestDate' },
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'TEAM', accessor: 'patient.team' },
    { name: 'STATUS', accessor: renderChipComponent }
  ];

  return (
    <Fragment>
      
      <Header
        pageTitle={'Appointment'}
        actionButton= {
            <ButtonBase to="/CreateAppointment" component={Link} style={{color: '#EFA14B'}}>
                 Create Appointment
            </ButtonBase>
        }
        styles={{ RootTabsContainer: classes.HeaderTabsContainer }}
        contexts={{
          tabs: {
            spacing: 3,
            tabItems: ['All Queues', 'Lab requests'],
            defaultTab: 'All Queues',
            handleTabChange: _selectedTab => {
              handleChange(_selectedTab);
            }
          },
        }}
      />
      <div /*style={{ marginTop: 50 }}*/>
        <TabPanel value={value} index={0}>
            <Grid container direction="column" className={classes.TableContainer}>
            <DataTable
                headers={tableHeaders}
                data={formattedData}
            />
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Grid container direction="column" className={classes.TableContainer}>
            <DataTable
                headers={tableHeaders}
                data={formatLab}
            />
            </Grid>
        </TabPanel>
      </div>
    </Fragment>
  );
};

export default compose(withQueueStatusAppointment)(View);
