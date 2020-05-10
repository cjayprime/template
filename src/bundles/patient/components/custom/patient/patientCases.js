import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { DataTable } from 'bundles/shared/components/Datatable';

export const PatientCases = () => {
  const useStyle = makeStyles(() => ({
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
      paddingTop: 12,
      textTransform: 'capitalize',
      '&:first-child': {
        paddingLeft: 0,
        fontWeight: 600
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

  const testCaseStore = [
    {
      createdAt: '31 Mar, 3:00 PM',
      submittedBy: 'Vincent Simpson',
      epidNo: '123456',
      type: 'Questionnaire',
      notes: 'Some random thing here'
    },
    {
      createdAt: '31 Mar, 3:00 PM',
      submittedBy: 'Lucas Cruz',
      epidNo: '123456',
      type: 'Questionnaire',
      notes:
        'Additional information, lorem ipsum, dolor sit amet, lorem ipsum Additional information, lorem ipsum, dolor sit amet, lorem ipsum'
    },
    {
      createdAt: '31 Mar, 3:00 PM',
      submittedBy: 'Barbara Norris',
      epidNo: '123456',
      type: 'Questionnaire',
      notes: 'Some random thing here'
    }
  ];

  const renderCaseActionComponent = row => (
    <Button className={classes.ActionButton}>View Details</Button>
  );

  const caseHeader = [
    { name: 'DATE', accessor: 'createdAt' },
    { name: 'SUBMITTED BY', accessor: 'submittedBy' },
    { name: 'EPID NO', accessor: 'epidNo' },
    { name: 'TYPE', accessor: 'type' },
    { name: 'NOTES', accessor: 'notes' },
    { name: 'ACTION', accessor: renderCaseActionComponent }
  ];

  return (
    <DataTable
      headers={caseHeader}
      noBorder={true}
      data={testCaseStore}
      styles={classes}
    />
  );
};
