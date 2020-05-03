import React, { Fragment } from 'react';
import {
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
	InputLabel,
	TextField,
  Typography
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { DataTable, Header } from '../../../bundles/shared/components';
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
  collapsible: {
    padding: 20
  },
  input: {}
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
    <Grid className={classes.collapsible} container>
      <form>
        <FormControl className={classes.margin}>
          <InputLabel shrink htmlFor="notes">Notes</InputLabel>
          <TextField id="notes" />
        </FormControl>
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
