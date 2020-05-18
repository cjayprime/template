import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import withLocations from 'bundles/location/hoc/withLocation';
import {
  Grid,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  IconButton,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { DataTable } from '../../shared/components';
import { addBedLocation, addSelectedLocation } from 'bundles/location/actions';
import updateLocationMutation from 'bundles/location/hoc/updateLocation'
import createLocationMutation from 'bundles/location/hoc/createLocation';
 
import { makeStyles } from '@material-ui/styles';
const compose = require('lodash')?.flowRight;

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: 15,
    color: '#231E1E'
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  newLocation: {
    backgroundColor: 'transparent',
    color: '#EFA14B',
    fontSize: 13,
    fontWeight: 'bold',
   // padding: '11.5px 34px',
    boxShadow: 'none',
    // borderRadius: 50,
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#EFA14B',
      fontSize: 13,
      cursor: 'pointer !important',
      boxShadow: 'none',
    }
  },
  primaryButton: {
    backgroundColor: '#CB6A00',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow:
    '0 6px 16px rgba(239, 161, 75, 0.20), 0 2px 10px rgba(239, 161, 75, 0.10)',
    '&:hover': {
      backgroundColor: '#CB6A00',
      color: '#fff',
      fontSize: 13
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#CB6A00',
    fontSize: 13,
    fontWeight: 'bold',
    padding: '11.5px 34px',
    borderRadius: 50,
    textTransform: 'uppercase',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#CB6A00',
      fontSize: 13,
      boxShadow: 'none'
    }
  },
  dialog: {
    backgroundColor: 'transparent',
    // backgroundColor: '#2B2D40',
    boxShadow: 'none'
  },
  dialogheaderText: {
    fontSize: 24,
    color: '#231E1E',
    textAlign: 'center'
  },
  dialogContainer: {
    backgroundColor: 'rgba(246, 246, 246, 0.7)',
    backdropFilter: 'blur(4px)'
  },
  dialogCloseButton: {
    position: 'fixed',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#231E1E'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`
    },
    backgroundColor: '#E8E6E6',
    color: '#685E5E'
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
    color: '#CB6A00',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#CB6A00'
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
    color: '#ED666B',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#ED666B'
    }
  }
}));

const formatData = locationData => {
  return locationData.map(location => {
    return {
      location: {
        name: location.name,
        id: location.id,
        numberOfBeds: location.numberOfBeds,
        openBeds:
          location.numberOfBeds -
          location.patientLocationsByLocationId.totalCount
      }
    };
  });
};

const Location = ({ locationData, createLocation, addBed, addSelected, history, updateLocation }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editMode,setEditMode] = useState(false);
  const [currentEditingLocation, setCurrentEditingLocation] = useState({});

  const handleClickOpen = () => {
    setEditMode(false)
    setOpen(true);
  };

  const handleClose = () => {
    setFormInput({}); // Fix this from throwing react controlled input error
    setEditMode(false)
    setOpen(false);
  };

  const handleChange = (key, value) => {
    setFormInput({ ...formInput, [key]: value });
  };

  const handleEdit = (id) => {
    const locationValue = locationData.filter((item) => item.id == id)[0]
    const minimum = locationValue.patientLocationsByLocationId.totalCount;
    const nodeId = locationValue.nodeId;
    setCurrentEditingLocation(locationValue)
    setFormInput({ ...formInput, ['name']: locationValue.name , 
      ['numberOfBeds']: locationValue.numberOfBeds, minimum, nodeId });
    setEditMode(true)
    setOpen(true);  
  }

  const handleShow = (id) => {
    addSelected(id)
    history.push('/BedManagement')
  }

  const handleEditSave = async() => {
    if(formInput.numberOfBeds < formInput.minimum)
    return

    var response = await updateLocation({
      variables: {
        input: {
          nodeId: formInput.nodeId,
          locationPatch: {
            name: formInput.name,
            numberOfBeds: formInput.numberOfBeds
          }
        }
      }
    })

    if(response) {
      const newTableData = formatData(
        response.data.updateLocation.query.allLocations.nodes
      );
      setTableData(newTableData);
      handleClose();
    }
  } 

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

  const renderActionComponent = (row) => (
    <Fragment>
      <Box display="flex">
        <Button
          disableElevation
          classes={{
            root: classes.actionButtons,
            focusVisible: classes.actionButtons
          }}
          onClick={() =>  handleShow(row.location.id)}
          variant="contained">
          {'SHOW'}
        </Button>
        <Button
          disableElevation
          classes={{
            root: classes.actionButtons,
            focusVisible: classes.actionButtons
          }}
          onClick={() => handleEdit(row.location.id)}
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
          root: classes.dialogRoot,
          container: classes.dialogContainer
        }}
        maxWidth={'sm'}>
          <IconButton
            aria-label="close"
            className={classes.dialogCloseButton}
            onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.dialogheaderText}>
            Add new location
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography className={classes.text}>Name</Typography>
            <div style={{ marginTop: 10 }}>
              <OutlinedInput
                fullWidth
                value={formInput.name}
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
            <Typography className={classes.text}>
              Number of beds { formInput.minimum ? <Typography style={{color: 'rgb(255, 91, 103)'}}> 
                * bed(s) cannot be less than {formInput.minimum} </Typography> : ''}
            </Typography>
            <div style={{ marginTop: 10 }}>
              <OutlinedInput
                fullWidth
                type="number"
                value={formInput.numberOfBeds}
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
              onClick={editMode ? handleEditSave :  createBed}
              classes={{ root: classes.primaryButton }}>
               {editMode ? 'UPDATE' : 'ADD'}
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
  addBed: value => dispatch(addBedLocation(value)),
  addSelected: value => dispatch(addSelectedLocation(value))
});
 
export default withRouter(compose(connect(null, 
    mapDispatchToProps),
    withLocations, 
    updateLocationMutation, 
    createLocationMutation)(Location));



