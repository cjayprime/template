import React, { Fragment, useState, useEffect } from 'react';
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
import { connect } from 'react-redux';
import { DataTable } from '../../shared/components';
import { addBedLocation } from 'bundles/location/actions';
import createLocationMutation from 'bundles/location/hoc/createLocation';

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
  newLocation: {
    backgroundColor: 'transparent',
    color: '#8EE2E5',
    fontSize: 13,
    fontWeight: 'bold',
   // padding: '11.5px 34px',
    boxShadow: 'none',
    // borderRadius: 50,
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#8EE2E5',
      fontSize: 13,
      cursor: 'pointer',
      boxShadow: 'none',
    }
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
      '0 6px 16px rgba(39, 186, 192, 0.20), 0 2px 10px rgba(39, 186, 192, 0.10)',
    '&:hover': {
      backgroundColor: '#27BAC0',
      color: '#fff',
      fontSize: 13
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#fff',
      fontSize: 13,
      boxShadow: 'none'
    }
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
  },
  actionButtons: {
    backgroundColor: 'transparent',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 0',
    borderRadius: 50,
    marginRight: 5,
    textTransform: 'uppercase',
    color: '#8EE2E5',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#8EE2E5'
    }
  },
  actionDeleteButton: {
    backgroundColor: 'transparent',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 0',
    borderRadius: 50,
    marginRight: 5,
    textTransform: 'uppercase',
    color: '#EEBEC2',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#EEBEC2'
    }
  }
}));

const formatData = locationData => {
  return locationData.map(location => {
    return {
      location: {
        name: location.name,
        numberOfBeds: location.numberOfBeds,
        openBeds:
          location.numberOfBeds -
          location.patientLocationsByLocationId.totalCount
      }
    };
  });
};

const Location = ({ locationData, createLocation, addBed }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [tableData, setTableData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (key, value) => {
    setFormInput({ ...formInput, [key]: value });
  };

  const createBed = async () => {
    const response = await createLocation({
      variables: {
        input: {
          location: {
            ...formInput
          }
        }
      }
    });

    const newTableData = formatData(
      response.data.createLocation.query.allLocations.nodes
    );
    setTableData(newTableData);
    handleClose();
  };

  const renderActionComponent = () => (
    <Fragment>
      <Box display="flex">
        <Button
          disableElevation
          classes={{
            root: classes.actionButtons,
            focusVisible: classes.actionButtons
          }}
          onClick={handleClose}
          variant="contained">
          {'SHOW'}
        </Button>
        <Button
          disableElevation
          classes={{
            root: classes.actionButtons,
            focusVisible: classes.actionButtons
          }}
          onClick={handleClose}
          variant="contained">
          {'EDIT'}
        </Button>
        <Button
          disableElevation
          classes={{
            root: classes.actionDeleteButton,
            focusVisible: classes.actionDeleteButton
          }}
          onClick={handleClose}
          variant="contained">
          {'DELETE'}
        </Button>
      </Box>
    </Fragment>
  );

  const tableHeaders = [
    { name: 'CENTER', accessor: 'location.name' },
    { name: 'NO. OF BEDS', accessor: 'location.numberOfBeds' },
    {
      name: 'OPEN',
      accessor: 'location.openBeds'
    },
    { name: 'ACTIONS', accessor: renderActionComponent }
  ];

  useEffect(() => {
    const data = formatData(locationData);

    if (data.length > 0) {
      setTableData(data);
      addBed(locationData)
    }
  }, [locationData]);

  if (!locationData) return null; // Should be loader
 
  return (
    <Fragment>
      <Grid container>
      <Grid item xs>
           <Typography className={classes.text}>{`${tableData.length} Locations`}</Typography> 
        </Grid>
        <Grid item >
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            classes={{ root: classes.newLocation }}>
            Add New location
          </Button>
        </Grid>
        
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <DataTable headers={tableHeaders} data={tableData} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
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
                onChange={e => handleChange('name', e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <Typography className={classes.text}>Number of beds</Typography>
            <div style={{ marginTop: 10 }}>
              <OutlinedInput
                fullWidth
                type="number"
                classes={{
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }}
                onChange={e =>
                  handleChange('numberOfBeds', parseInt(e.target.value, 10))
                }
              />
            </div>
          </div>
        </DialogContent>
        <div style={{ margin: '10px 0' }}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={createBed}
              classes={{ root: classes.primaryButton }}>
              ADD
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" style={{ marginTop: 15 }}>
            <Button
              classes={{
                root: classes.secondaryButton,
                focusVisible: classes.secondaryButton
              }}
              onClick={handleClose}
              variant="contained">
              CANCEL
            </Button>
          </Box>
        </div>
      </Dialog>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  addBed: value => dispatch(addBedLocation(value))
});
 
export default compose(connect(null, mapDispatchToProps),withLocations, createLocationMutation)(Location);



