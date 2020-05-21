import React, { Fragment } from 'react';
import QUEUE_STATE from 'bundles/queue/utilities/stateTransition';
import {
  statusIfRequestAccepted,
  isRequestAccepted,
  dispatchEvent
} from 'bundles/queue/utilities/queue';
import { Typography, Grid, Button } from '@material-ui/core';
import {
  DataTable,
  Header,
  PatientMetadatum,
  TeamMetadatum,
  FilterList
} from 'bundles/shared/components';
import { capitalizeFirstWord } from 'bundles/patient/components/custom/formBuilder';

import { QueuePageStyles } from './index.style';

export const QueueTableView = ({ accepted, owner, pending, apiCalls }) => {
  const classes = QueuePageStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = newValue => {
    setValue(newValue);
  };

  const getGQLProps = () => {
    return { ...apiCalls }
  }
  
  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstName} ${row.patient.lastName}`}
      sex={row.patient.sex}
      age={row.patient.age}
      riskLevel={row.patient.riskLevel ? capitalizeFirstWord(row.patient.riskLevel) : 'No'}
    />
  );
 
  const renderTeamCell = row => {
    return (
      <TeamMetadatum
        text={row.patient.team}
        tagLabel={
          isRequestAccepted(row)
            ? row.patient.status || statusIfRequestAccepted(row)
            : statusIfRequestAccepted(row)
        }
        spacing={{ mainText: 6, label: 6 }}
        classes={classes}
      />
    );
  };

  const renderActionComponent = row => {   
    const queueText = isRequestAccepted(row)
      ? row.patient.status
        ? QUEUE_STATE[row.patient.team][row.patient.status]?.text ||
          'View Queue History'
        : QUEUE_STATE[row.patient.team][row.patient.tableStatus]?.text
      : 'ACCEPT';

    return (
      <Button
        onClick={() => dispatchEvent(row, queueText, getGQLProps() )}
        className={classes.ActionButton}>
        {queueText}
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
