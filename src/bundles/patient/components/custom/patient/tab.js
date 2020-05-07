import React, { Fragment } from 'react';
import { Grid, Tabs, Tab, Typography, Box } from '@material-ui/core';
import Formbuilder from 'bundles/patient/components/custom/formBuilder';
import { makeStyles } from '@material-ui/core/styles';

const HeaderStyles = makeStyles(theme => ({
  HeaderContainer: {
    position: 'fixed',
    top: '-103px' //TODO{H.Ezekiel} we should not need to do this
  },
  TabIndicator: {
    height: 5
  },
  TabContainer: {
    paddingBottom: 10

    // fontSize: '14px'
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
    content: [{ Nationality: 'Nigeria', 'Occupation': 'Health Worker' }]
  },
  {
    type: 'detail',
    content: [{ Location: 'Location Name', 'Other': 'Other info' }]
  }
];

const PatientTab = () => {
  const [value, setValue] = React.useState(0);
  const classes = HeaderStyles();

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
              <Fragment>
                {PATIENT_DETAILS.map(data => {
                  return <Formbuilder formInput={data} />;
                })}
              </Fragment>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Hello
          </TabPanel>
          <TabPanel value={value} index={2}>
            thanks
          </TabPanel>
          <TabPanel value={value} index={3}>
            thanks
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
