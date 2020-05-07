import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Button, Chip, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DataTable, Header } from '../../../bundles/shared/components';
import FormBuilder from '../../../bundles/patient/components/custom/formBuilder';
import { pendingStore, patientStore } from './store';

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

export default () => {
  const classes = useStyles();
  const renderActionComponent = row => (
    <Button className={classes.actionButton}>Submit Result</Button>
  );

  const renderStatusComponent = row => (
    <Chip label={row.status} variant="default" size="small" />
  );

  const renderCollapsibleComponent = row => (
    <Grid container>
      <form className={classes.form}>
        <Grid spacing={1} direction="row" container>
          <Grid item xs={4}>
            <FormBuilder
              formInput={{
                type: 'select',
                label: 'Specimen',
                labelDirection: 'column',
                fields: ['one', 'two', 'three', 'four']
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <FormBuilder
              formInput={{
                type: 'text',
                labelDirection: 'column',
                placeholder: 'Enter notes here...',
                label: 'Notes'
              }}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button size="large" className={classes.formButton}>
            Cancel
          </Button>
          <Button
            size="large"
            className={classnames(classes.formButton, classes.formButtonTS)}>
            Take Sample
          </Button>
        </Grid>
      </form>
    </Grid>
  );

  const headers = [
    { name: 'SAMPLE NO.', accessor: 'sampleNumber' },
    { name: 'REQUEST DATE', accessor: 'requestDate' },
    { name: 'NAME OF TEST', accessor: 'testName' },
    { name: 'STATUS', accessor: renderStatusComponent },
    { name: 'REQUESTED BY', accessor: 'requestedBy' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];

  return (
    <Fragment>
      <Header
        pageTitle="Lab Requests"
        contexts={{
          tabs: {
            tabItems: ['All Requests', 'My Lab Requests'],
            defaultTab: 'All Requests',
            handleTabChange: _selectedTab => {}
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
      <Container>
        <Container className={classes.tableContainer}>
          <Grid container>
            <Typography className={classes.tableTitle}>
              7 Pending Lab Requests
            </Typography>
          </Grid>
          <DataTable
            headers={headers}
            data={pendingStore}
            renderCollapsible={renderCollapsibleComponent}
          />
        </Container>
        <Container className={classes.tableContainer}>
          <Typography className={classes.tableTitle}>120 Completed</Typography>
          <DataTable headers={headers} data={patientStore} />
        </Container>
      </Container>
    </Fragment>
  );
};
