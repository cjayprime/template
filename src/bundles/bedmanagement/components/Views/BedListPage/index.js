import React, { Fragment, useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import withLocations from 'bundles/location/hoc/withLocation';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { BedListPageStyles } from './index.style';
import {
  Header,
  DataTable,
  PatientMetadatum,
  SummaryBox
} from 'bundles/shared/components';
import { getAge } from 'bundles/queue/utilities/queue'; 
import { capitalizeFirstWord } from 'bundles/patient/components/custom/formBuilder';
import { searchFilter } from 'bundles/location/selectors';
import { addSelectedLocation } from 'bundles/location/actions';
const compose = require('lodash')?.flowRight;

 const BedListPage = ({locationData, props, selectedLocation, addSelected}) => {
  const classes = BedListPageStyles();
  const [locationBed, setlocationBed ] = useState([])
  const [tableData, setTableData] = useState({ locationName: [], summary: [], data: []});
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const  { data, summary, locationName } =  parseQueue(locationData);

    if (locationData.length > 0) {
      setTableData({ data, summary, locationName });
    } 
  }, [locationData]);


  useEffect(() => {
    if(selectedLocation > 0) { // Used for single location clicks
      const locationValue = locationData.filter((item) => item.id == selectedLocation)
      const  { data, summary, locationName } =  parseQueue([...locationValue]);
      setTableData({ data, summary, locationName }); 
      addSelected(0)
    }
  }, []);

  if(!locationData) return null

  const handleChange = newValue => {
     
    if(newValue == 0) { // Used to switch tabs
      const  { data, summary, locationName } =  parseQueue(locationData); 
      setTableData({ data, summary, locationName });

    } else {
      // We always want to pass in an array into parseQueue
      const  { data, summary, locationName } =  parseQueue([locationData[newValue - 1]]);
      setTableData({ data, summary, locationName });
    }  
    setValue(newValue);
  };

  const remap = (user) => ({

    patient: {
      riskLevel: user.patientCasesByPatientId.nodes.length > 0 ? 
        user.patientCasesByPatientId.nodes[user.patientCasesByPatientId.nodes.length - 1]?.riskLevel : undefined, // This will always display the most recent status
      ...user,
      dateAdmitted: user.dateAdmitted ? new Date(user.dateAdmitted).toDateString() : ''
    }
  }) 
  //patientsByPatientLocationLocationIdAndPatientId
  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstname || ''} ${row.patient.lastname || ''}`}
      sex={row.patient.sex ? row.patient.sex.toLowerCase() : ''}
      age={getAge(row.patient.birthDate) || ''}
      textRowDirection={'row'}
      riskLevel={row.patient.riskLevel ? capitalizeFirstWord(row.patient.riskLevel): 'No '}
    />
  );

  const renderActionComponent = row => (
    <Typography className={classes.ActionButton}>{'VIEW CASE'}</Typography>
  );
  
  const parseQueue = (location) => {
      // Initial Structure is a list of locations with patients
      // We need to convert to a list of patients

      // initial = [location: [children], location: [childre]  ]
      // We want [ child, child, child ]

      let bedCount = 0; 
      let occupied = 0;
      let locationName = []
      const refined = location.reduce((acc, current) => { // N2 logic but it does the job for now
      locationName.push(current.name)
      bedCount += current.numberOfBeds
      const objectMapper = {} // Parent Object hold, will hold data by ids
      occupied += current.patientLocationsByLocationId.totalCount

      current.patientLocationsByLocationId.nodes.forEach((node) => {     // Get the child nodes and spread to parent Object
        if(objectMapper[node.patientId]) objectMapper[node.patientId] = { ...objectMapper[node.patientId], ...node }
        else {
          objectMapper[node.patientId] = { ...node, locationId: current.id}
        }
      })  

      current.patientsByPatientLocationLocationIdAndPatientId.nodes.forEach((node) => { // Get the child nodes and spread to parent Object
        if(objectMapper[node.id]) objectMapper[node.id] = { ...objectMapper[node.id], ...node }
        else {
          objectMapper[node.id] = { ...node, locationId: current.id}
        }
      })
      acc = { ...acc, ...objectMapper }
      return acc
    }, {})  // Produces  {1: {child nodes all spread to parent}, 2: {child nodes all spread to parent}} Grouped by ids

    const parsedData = Object.keys(refined).map((item) => {
      return {
        ...remap(refined[item])
      }
    }) // Use remap to assign objects to fit table structure

     const numbers = [
      {
        header: { label: 'Total # of Beds', color: '#A99FEC' },
        value: { label: bedCount, color: 'white' }
      },
      {
        header: { label: 'Assigned', color: '#BA9E7C' },
        value: { label: occupied, color: 'white' }
      },
      {
        header: { label: 'Available', color: '#C49FA6' },
        value: { label: bedCount - occupied, color: 'white' }
      }
    ]; 

    if(tableData.locationName.length > locationName.length) {
      locationName = tableData.locationName
    } else{
      if(selectedLocation == 0) 
        locationName = ['All', ...locationName]
      else{
        locationName = [...locationName]
      }
    }
    
    return { data: parsedData, summary: numbers, locationName: locationName }
  } 

  

  const tableHeaders = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'EPID NO', accessor: 'patient.epidNumber' },
    { name: 'ADMITTED', accessor: 'patient.dateAdmitted' },
    { name: 'ACTION', accessor: renderActionComponent }
  ];
  return (
    <Fragment>
      <Header
        pageTitle={'Bed Management'}
        styles={{ RootTabsContainer: classes.HeaderTabsContainer }}
        contexts={{     
          tabs: {
            spacing: selectedLocation > 0 ? 2 : 8,
            tabItems: [...tableData.locationName],
            defaultTab: tableData.locationName.length?  tableData.locationName[0]: '',
            handleTabChange: _selectedTab => {
              handleChange(_selectedTab);
            }
          }
        }}
      />
      <div style={{ marginTop: 50}}>
        <Grid className={classes.SummaryContainer} container>
          {tableData.summary.map(item => { 
            return (
              <Grid xs={4} item key={item.header.label}>
                <SummaryBox
                  header={item.header.label}
                  value={item.value.label}
                  colors={{
                    header: item.header.color,
                    caption: item.value.color
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container direction="column" className={classes.TableContainer}>
          <DataTable headers={tableHeaders} data={tableData.data} />
        </Grid>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  addSelected: value => dispatch(addSelectedLocation(value))
});

const mapStateToProps = state => ({
  selectedLocation: searchFilter.getSelected(state)
}); 

export default compose(connect(mapStateToProps ,mapDispatchToProps),withLocations)(BedListPage)

