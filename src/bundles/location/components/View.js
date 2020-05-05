import React, { Fragment } from 'react';
import withLocations from 'bundles/location/hoc/withLocation';
import {
  Grid,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Button
} from '@material-ui/core';

import { DataTable } from '../../shared/components';

import { makeStyles } from '@material-ui/styles';
const compose = require('lodash')?.flowRight;

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: 15,
    color: '#fff'
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  primaryButton: {
    backgroundColor: '#27BAC0',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow:
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow: 'none'
  },
  dialog: {
    backgroundColor: 'transparent',
    // backgroundColor: '#2B2D40',
    boxShadow: 'none'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#474562',
    color: '#fff'
  },
  cssFocused: {},
  notchedOutline: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    borderWidth: '1px',
    borderColor: 'transparent !important',
    color: 'white'
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
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Typography className={classes.text}> Locations</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <DataTable headers={tableHeaders} data={store} />
        </Grid>
      </Grid>
      <Dialog
        open={true}
        onClose={handleClose}
        fullWidth={true}
        classes={{
          paper: classes.dialog,
          root: classes.dialogRoot
        }}
        maxWidth={'sm'}>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.headerText}>
            Add new location
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography className={classes.text}>Name</Typography>
            <div style={{ marginTop: 10 }}>
              <OutlinedInput
                fullWidth
                classes={{
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <Typography className={classes.text}>Number of beds</Typography>
            <div style={{ marginTop: 10 }}>
              <OutlinedInput
                fullWidth
                classes={{
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }}
              />
            </div>
          </div>
        </DialogContent>
        <div style={{ margin: '10px 0' }}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              classes={{ root: classes.primaryButton }}>
              Next
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" style={{ marginTop: 15 }}>
            <Button
              classes={{
                root: classes.secondaryButton,
                focusVisible: classes.secondaryButton
              }}
              variant="contained">
              Back
            </Button>
          </Box>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default compose(withLocations)(Location);
