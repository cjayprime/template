import React, { Fragment } from 'react';
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Chip
} from '@material-ui/core';
import Formbuilder from 'bundles/patient/components/custom/formBuilder';
import { makeStyles } from '@material-ui/core/styles';
import { DataTable } from 'bundles/shared/components/Datatable';
import { PatientDetails } from './patientDetails';
import { PatientCallHistory } from './patientCallHistory';

const HeaderStyles = makeStyles(theme => ({
  HeaderContainer: {
    position: 'fixed'
  },
  TabIndicator: {
    height: 4,
    backgroundColor: '#FFFEFD'
  },
  TabContainer: {},
  SelectedTabContainer: {
    color: 'white'
  }
}));

export const PATIENT_DETAILS = [
  {
    title: 'Contact Information',
    type: 'detail',
    content: [
      { 'Phone Number': '09097438705' },
      { Email: 'jbadewale@yahoo.com' }
    ]
  },
  {
    title: '',
    type: 'detail',
    content: [{ Address: '31 Adebiyi street, Adress 2, State, City' }]
  },
  {
    title: 'Other',
    type: 'detail',
    content: [{ LGA: 'Lores ipsum', 'Country of Residence': 'Nigeria' }]
  },
  {
    type: 'detail',
    content: [{ Nationality: 'Nigeria', Occupation: 'Health Worker' }]
  },
  {
    type: 'detail',
    content: [{ Location: 'Location Name', Other: 'Other info' }]
  }
];

export const CALL_SUMMARY = [
  {
    title: '21 March , 2015',
    fullWidth: true,
    type: 'detail',
    content: [{ key: '09097438705' }]
  },
  {
    title: '23 March , 2015',
    fullWidth: true,
    type: 'detail',
    content: [{ key: '31 Adebiyi street, Adress 2, State, City' }]
  },
  {
    title: '28 March , 2015',
    fullWidth: true,
    type: 'detail',
    content: [{ key: 'Lores ipsum' }]
  },
  {
    title: '28 March , 2015',
    fullWidth: true,
    type: 'detail',
    content: [{ key: 'Nigeria' }]
  }
];

export const patientStore = [
  {
    sampleNumber: '400',
    testName: 'Test 1',
    status: 'Completed',
    requestedBy: 'Dr. G. Jenkins',
    waitTime: '4 hours',
    requestDate: '31 Mar, 7:34PM'
  },
  {
    sampleNumber: '430',
    testName: 'Test 1',
    status: 'Completed',
    requestedBy: 'Jolade Adewale',
    waitTime: '4 hours',
    requestDate: '31 Mar, 7:34PM'
  },
  {
    sampleNumber: '404',
    testName: 'Test 1',
    status: 'Completed',
    requestedBy: 'Dr. G. Jenkins',
    waitTime: '4 hours',
    requestDate: '31 Mar, 7:34PM'
  }
];

/*
const caseHeader = [
  { name: 'DATE', accessor: 'sampleNumber' },
  { name: 'SUBMITTED BY', accessor: 'requestDate' },
  { name: 'EPID NO', accessor: 'testName' },
  { name: 'TYPE', accessor: 'type' },
  { name: 'NOTES', accessor: 'requestedBy' },
  { name: 'ACTION', accessor: renderActionComponent }
]; */

const PatientTab = ({ patientData }) => {
  const [value, setValue] = React.useState(0);
  const classes = HeaderStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderActionComponent = row => (
    <Button className={classes.actionButton}>Submit Result</Button>
  );

  const labHeader = [
    { name: 'DATE REQUESTED.', accessor: 'dateRequested' },
    { name: 'NAME OF TEST', accessor: 'requestDate' },
    { name: 'STATUS', accessor: 'status' },
    { name: 'RESULT', accessor: 'result' },
    { name: 'CREATED BY', accessor: 'createdBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];

  const testStore = [
    {
      dateRequested: '400',
      status: 'Completed',
      result: 'Dr. G. Jenkins',
      createdBy: '4 hours',
      requestDate: '31 Mar, 7:34PM'
    },
    {
      dateRequested: '400',
      status: 'Completed',
      result: 'Dr. G. Jenkins',
      createdBy: '4 hours',
      requestDate: '31 Mar, 7:34PM'
    }
  ];

  const renderStatusComponent = row => (
    <Chip label={row.status} variant="default" size="small" />
  );

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}>
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  return (
    <Grid container style={{ paddingLeft: 2, paddingRight: 2 }}>
      <Grid item xs={9}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          style={{
            backgroundColor: '#474562',
            color: '#28BAC0',
            borderTopLeftRadius: 5,
            borderBottomWidth: 5
          }}
          inkBarStyle={{ height: 10 }}
          classes={{
            indicator: classes.TabIndicator,
            //root: clsx(classes.TabContainer),
            flexContainer: classes.TabContainer
          }}
          //textColor="primary"
          left>
          <Tab label="Patient Details" />
          <Tab label="Call history" />
          <Tab label="Case" />
          <Tab label="Laboratory" />
          <Tab label="Appointments" />
          <Tab label="Others" />
          <Tab label="In patient" />
        </Tabs>
      </Grid>
      <Grid
        container
        xs={3}
        style={{
          backgroundColor: '#474562',
          color: '#fff',
          borderTopRightRadius: 5
        }}
        alignContent="center"
        alignItems="center">
        <Grid item xs={12}>
          <Typography> Log Call</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <TabPanel value={value} index={0}>
            <Grid container xs={12}>
              <PatientDetails {...patientData} />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container xs={12}>
              <PatientCallHistory />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DataTable headers={labHeader} noBorder={true} data={testStore} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DataTable headers={labHeader} noBorder={true} data={testStore} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            Appointments
          </TabPanel>
          <TabPanel value={value} index={5}>
            Others
          </TabPanel>
          <TabPanel value={value} index={6}>
            In patients
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientTab;
