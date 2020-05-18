import React, { useEffect, useState } from 'react';
import { Grid, Tabs, Tab, Box } from '@material-ui/core';
import Formbuilder from 'bundles/patient/components/custom/formBuilder';
import { makeStyles } from '@material-ui/core/styles';
import {
  PatientDetails,
  PatientCallHistory,
  PatientCases,
  PatientLabRequests,
  OtherPatientDetails,
  InpatientComponent,
  PatientAppointment
} from './tabComponents';

const useStyles = makeStyles(theme => ({
  HeaderContainer: {
    position: 'fixed'
  },
  TabIndicator: {
    height: 4,
    backgroundColor: '#231E1E',
    width: '70px !important'
  },
  TabContainer: {
    paddingLeft: 16
  },
  TabButtons: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: 500,
    paddingRight: 15,
    paddingLeft: 0,
    minWidth: 70,
    marginRight: 10,
    color: '#EFA14B',
    opacity: 1
  },
  TabButtonWrapper: {
    alignItems: 'flex-start',
    paddingLeft: 2
  },
  SelectedTabButtons: {
    color: '#231E1E',
  },
  SelectedTabContainer: {
    color: 'white'
  }
}));

const PatientTab = ({ patientData, markPatientDeceased, newCallLog }) => {
  const [value, setValue] = useState(0);
  const [patientInfo, setPatientInfo] = useState({});
  const classes = useStyles();

  useEffect(() => {
    setPatientInfo(patientData);
  }, [patientData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  const CustomTab = (label, classes) => {
    return (
      <Tab
        disableRipple
        classes={{
          root: classes.TabButtons,
          wrapper: classes.TabButtonWrapper,
          selected: classes.SelectedTabButtons
        }}
        label={label}
      />
    );
  };

  const createNewCallLog = async newLog => {
    try {
      const response = await newCallLog({
        variables: {
          input: {
            callLog: {
              ...newLog
            }
          }
        }
      });

      setPatientInfo({
        ...patientInfo,
        callLogs: [response.data.createCallLog.callLog, ...patientInfo.callLogs]
      });
    } catch (err) {
      // do something with error here
    }
  };

  const setPatientAsDead = async info => {
    try {
      const response = await markPatientDeceased({
        variables: {
          input: {
            deceasedPatient: {
              ...info,
              patientId: patientInfo.patient.id
            }
          }
        }
      });

      setPatientInfo({
        ...patientInfo,
        deceasedPatient: {
          ...response.data.createDeceasedPatient.deceasedPatient,
          ...info
        }
      });
    } catch (err) {
      // do something with the error
    }
  };

  return (
    <Grid
      container
      style={{
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: 8,
        // backgroundColor: 'rgba(113, 106, 158, 0.1)'
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
              <PatientDetails {...patientInfo} />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
              <PatientCallHistory
                {...patientInfo}
                newCallLog={createNewCallLog}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={2}>
              <PatientCases {...patientInfo} />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid container spacing={2}>
              <PatientLabRequests {...patientInfo} />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <PatientAppointment />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Grid container spacing={2}>
              <OtherPatientDetails
                {...patientInfo}
                markPatientAsDead={setPatientAsDead}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Grid container spacing={2}>
              <InpatientComponent {...patientData} />
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientTab;
