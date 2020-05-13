import React, { Fragment, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import withLocations from 'bundles/location/hoc/withLocation';
import clsx from 'clsx';
import { BedListPageStyles } from './index.style';
import { summaryNumbers, store } from './store';
import {
  Header,
  DataTable,
  PatientMetadatum,
  SummaryBox
} from '../../../../shared/components';
import { getAge } from 'bundles/queue/utilities/queue'; 
import { capitalizeFirstWord } from 'bundles/patient/components/custom/formBuilder'
const compose = require('lodash')?.flowRight;

 const BedListPage = ({locationData, props}) => {
  const classes = BedListPageStyles();
  const [tabelData, setTableData] = useState({});

  const remap = (user) => ({

    patient: {
      riskLevel: user.patientCasesByPatientId.nodes.length > 0 ? 
        user.patientCasesByPatientId.nodes[user.patientCasesByPatientId.nodes.length - 1]?.riskLevel : undefined, // This will always display the most recent status
      ...user
    }
  }) 
  //patientsByPatientLocationLocationIdAndPatientId
  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstname || ''} ${row.patient.lastname || ''}`}
      sex={row.patient.sex ? row.patient.sex.toLowerCase() : ''}
      age={getAge(row.patient.birthDate) || ''}
      textRowDirection={'row'}
      riskLevel={row.patient.riskLevel ? capitalizeFirstWord(row.patient.riskLevel): 'no '}
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
      const refined = location.reduce((acc, current) => { // N2 logic but it does the job for now

      const objectMapper = {} // Parent Object hold, will hold data by ids
      current.patientLocationsByLocationId.nodes.forEach((node) => {     // Get the child nodes and spread to parent Object
        if(objectMapper[node.patientId]) objectMapper[node.patientId] = { ...objectMapper[node.patientId], ...node }
        else {
          objectMapper[node.patientId] = { ...node, locationId: current.id}
        }
      })

      current.patientsByPatientLocationLocationIdAndPatientId.nodes.forEach((node) => { // Get the child nodes and spread to parent Object
        console.log(node)
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

    return parsedData;
  } 

   const dataParser =  parseQueue(locationData);

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
            tabItems: ['Yaba Center', 'Onikan Center'],
            defaultTab: 'Yaba Center',
            handleTabChange: _selectedTab => {}
          }
        }}
      />
      <div style={{ marginTop: 50}}>
        <Grid className={classes.SummaryContainer} container>
          {summaryNumbers.map(item => {
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
          <DataTable headers={tableHeaders} data={dataParser} />
        </Grid>
      </div>
    </Fragment>
  );
};


export default compose(withLocations)(BedListPage)

