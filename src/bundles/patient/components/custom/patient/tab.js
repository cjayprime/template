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
import {
  PatientDetails,
  PatientCallHistory,
  PatientCases,
  PatientLabRequests,
  OtherPatientDetails,
  InpatientComponent
} from './tabComponents';

const useStyles = makeStyles(theme => ({
  HeaderContainer: {
    position: 'fixed'
  },
  TabIndicator: {
    height: 4,
    backgroundColor: '#FFFEFD',
    width: '70px !important'
  },
  TabContainer: {
    paddingLeft: 16
  },
  TabButtons: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 15,
    paddingLeft: 0,
    minWidth: 70,
    marginRight: 10
  },
  TabButtonWrapper: {
    alignItems: 'flex-start',
    paddingLeft: 2
  },
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

const PatientTab = ({ patientData }) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const CustomTab = (label, classes) => {
    return (
      <Tab
        classes={{
          root: classes.TabButtons,
          wrapper: classes.TabButtonWrapper
        }}
        label={label}
      />
    );
  };

  return (
    <Grid
      container
      style={{
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: 8,
        backgroundColor: 'rgba(113, 106, 158, 0.1)'
      }}>
      <Grid item xs={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          style={{
            color: '#fff',
            borderBottomWidth: 5
          }}
          classes={{
            indicator: classes.TabIndicator,
            flexContainer: classes.TabContainer
          }}>
          {[
            'Patient Details',
            'Call history',
            'Case',
            'Laboratory',
            'Appointments',
            'Others',
            'In patient'
          ].map(label => CustomTab(label, classes))}
        </Tabs>
      </Grid>
      {/* <Grid
        item
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
      </Grid> */}
      <Grid item xs={12}>
        <Grid>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <PatientDetails {...patientData} />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
              <PatientCallHistory />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={2}>
              <PatientCases />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid container spacing={2}>
              <PatientLabRequests />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Grid container spacing={2}>
              Appointments
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Grid container spacing={2}>
              <OtherPatientDetails />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Grid container spacing={2}>
              <InpatientComponent />
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientTab;
