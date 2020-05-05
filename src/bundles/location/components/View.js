import React, { Fragment, useState } from 'react';
import withLocations from 'bundles/location/hoc/withLocation';
import { Grid, Typography, Box } from '@material-ui/core';

import { DataTable } from '../../shared/components';

import { makeStyles } from '@material-ui/styles';
const compose = require('lodash')?.flowRight;

const useStyles = makeStyles(() => ({
  headerText: {
    fontSize: 15,
    color: '#fff'
  }
}));

export const store = [
  {
    location: {
      name: 'Gbaga Isolation Center',
      numberOfBeds: 135,
      patientLocationsByLocationId: {
        nodes: [
          {
            patientId: 2,
            status: 'ADMITTED',
            dischargeReason: null
          }
        ],
        totalCount: 1
      }
    }
  }
];

const Location = ({ locationData }) => {
  const classes = useStyles();

  const renderActionComponent = () => (
    <Fragment>
      <Box display="flex">
        <Typography>{'SHOW'}</Typography>
        <Typography>{'EDIT'}</Typography>
        <Typography>{'DELETE'}</Typography>
      </Box>
    </Fragment>
  );

  const tableHeaders = [
    { name: 'CENTER', accessor: 'location.name' },
    { name: 'NO. OF BEDS', accessor: 'location.numberOfBeds' },
    {
      name: 'OPEN',
      accessor: row => {
        const { location } = row;
        const { numberOfBeds, patientLocationsByLocationId } = location;
        return (
          <Fragment>
            {numberOfBeds - patientLocationsByLocationId.totalCount}
          </Fragment>
        );
      }
    },
    { name: 'ACTIONS', accessor: renderActionComponent }
  ];

  if (!locationData) return null; // Should be loader

  return (
    <Fragment>
      <Grid container>
        <Grid item>
          <Typography className={classes.headerText}> Locations</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <DataTable headers={tableHeaders} data={store} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose(withLocations)(Location);
