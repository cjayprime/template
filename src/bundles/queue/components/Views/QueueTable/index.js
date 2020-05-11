import React, { Fragment } from 'react';

import { Typography, Grid, Button } from '@material-ui/core';
import {
  DataTable,
  Header,
  PatientMetadatum,
  TeamMetadatum,
  FilterList
} from 'bundles/shared/components';

import { QueuePageStyles } from './index.style';

export const QueueTableView = ({ accepted, owner, pending }) => {
  const classes = QueuePageStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = newValue => {
    setValue(newValue);
  };

  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstName} ${row.patient.lastName}`}
      sex={row.patient.sex}
      age={row.patient.age}
      riskLevel={row.patient.riskLevel ? row.patient.riskLevel : 'No'}
    />
  );

  const renderTeamCell = row => {
    let defaultStatus = 'No status';


    if (
      row.patient.tableStatus == 'Accepted' ||
      row.patient.tableStatus == 'Not Owned'
    ) {
      defaultStatus = 'Awaiting appointment';

      if (row.patient.team == 'RRT') {
        defaultStatus = 'Awaiting sample pickup';
      }
    }

    return (
      <TeamMetadatum
        text={row.patient.team}
        tagLabel={row.patient.status ? row.patient.status : `${defaultStatus}`}
        spacing={{ mainText: 6, label: 6 }}
        classes={classes}
      />
    );
  };

  const renderActionComponent = row => {
    if (row.patient.tableStatus == 'Accepted') {
      
      if (row.patient.team == 'RRT') {
        if (row.patient.status == 'Sample Collected') {
         
          return (
            <Button
              onClick={() =>
                row.patient.action(row.patient, 'Sample Delivered')
              }
              className={classes.ActionButton}
              style={{ color: 'rgb(255, 91, 103)' }}>
              {'DELIVER SAMPLE TO LAB'}
            </Button>
          );
        }

        if (row.patient.status == 'Sample Delivered') {
          return (
            <Button
              onClick={() => ''}
              className={classes.ViewButton}
             >
              {'View Queue History'}
            </Button>
          );
        }

        return (
          <Button
            onClick={() => row.patient.action(row.patient, 'Sample Collected')}
            className={classes.ActionButton}>
            {'MARK SAMPLE AS RECIEVED'}
          </Button>
        );
      }

      

      if (row.patient.status == 'Appointment Booked') {
        return (
          <Button onClick={() => ''} className={classes.ViewButton}>
            {'View Queue History'}
          </Button>
        );
      }

      return (
        <Button
          onClick={() => row.patient.action(row.patient)}
          className={classes.ActionButton}>
          {'BOOK APPOINTMENT'}
        </Button>
      );
    }

    return (
      <Button
        onClick={() =>
          row.patient.action(row.patient.id, 'accept', row.patient)
        }
        className={classes.ActionButton}>
        {'ACCEPT'}
      </Button>
    );
  };

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'REQUEST DATE', accessor: 'patient.requestDate' },
    { name: 'WAIT TIME', accessor: 'patient.waitTime' },
    { name: 'TEAM', accessor: renderTeamCell },
    { name: 'ACCEPTED BY', accessor: 'patient.acceptedBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    console.log('Here ', value);

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

  return (
    <Fragment>
      <Header
        pageTitle="Queue"
        contexts={{
          tabs: {
            tabItems: ['EPID / Surviellence', 'My Tasks'],
            defaultTab: 'RRT',
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
            placeholder: 'Search by Patient, EPID'
          }
        }}
      />
      <TabPanel value={value} index={0}>
        <div className={classes.PageContainer}>
          <div className={classes.TableContainer}>
            <Grid container>
              <Grid item xs={7}>
                <Typography className={classes.TextContainer}>
                  {`${pending.length} Pending`}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <FilterList
                  selector="LGA"
                  options={[{ value: 'Lagos Mainland' }]}
                />
              </Grid>
            </Grid>
            <DataTable headers={headers} data={pending} />
          </div>

          <div className={classes.TableContainer}>
            <Typography className={classes.TextContainer}>
              {`${accepted.length + owner.length} Patients`}
            </Typography>
            <DataTable headers={headers} data={[...accepted, ...owner]} />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.PageContainer}>
          <div className={classes.TableContainer}>
            <Typography className={classes.TextContainer}>
              {`${owner.length} Patients`}
            </Typography>
            <DataTable headers={headers} data={[...owner]} />
          </div>
        </div>
      </TabPanel>
    </Fragment>
  );
};
