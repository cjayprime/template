import React, { Fragment } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { DataTable } from 'bundles/shared/components/Datatable';
import moment from 'moment';

export const PatientCases = ({ patientCase }) => {
  const useStyle = makeStyles(() => ({
    Table: {
      backgroundColor: 'transparent'
    },
    HeaderTableCell: {
      color: '#BDB8D9',
      fontSize: 13,
      textTransform: 'uppercase',
      fontWeight: 400,
      border: 0,
      paddingTop: 0,
      paddingBottom: 12,
      '&:first-child': {
        paddingLeft: 0
      },
      '&:last-child': {
        maxWidth: 150
      },
      '&:nth-child(5)': {
        width: '40%'
      }
    },
    TableCell: {
      padding: 11,
      textTransform: 'capitalize',
      '&:first-child': {
        paddingLeft: 0,
        fontWeight: 600
      },
      '&:nth-child(5)': {
        maxWidth: 150,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    ActionButton: {
      color: '#EEBEC2',
      fontSize: 13,
      fontWeight: 'bold',
      padding: '5px 0'
    }
  }));
  const classes = useStyle();

  const renderCaseActionComponent = row => (
    <Button className={classes.ActionButton}>View Details</Button>
  );

  const renderCaseDateComponent = row => (
    <Fragment>{moment(row.createdAt).format('DD MMM, h:mm A')}</Fragment>
  );

  const caseHeader = [
    { name: 'DATE', accessor: renderCaseDateComponent },
    { name: 'SUBMITTED BY', accessor: 'submittedBy' },
    { name: 'EPID NO', accessor: 'epidNumber' },
    { name: 'TYPE', accessor: 'type' },
    { name: 'NOTES', accessor: 'notes' },
    { name: 'ACTION', accessor: renderCaseActionComponent }
  ];

  return (
    <DataTable
      headers={caseHeader}
      noBorder={true}
      data={patientCase.cases}
      styles={classes}
    />
  );
};
