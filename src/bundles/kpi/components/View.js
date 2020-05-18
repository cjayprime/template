import React, { Fragment, useEffect, useState } from 'react';
import withKpiData from 'bundles/kpi/hoc/withKpiData';
import { Grid } from '@material-ui/core';
import { capitalizeFirstWord } from 'bundles/patient/components/custom/formBuilder';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import {
  DataTable,
  Header,
  PatientMetadatum,
  TeamMetadatum
} from 'bundles/shared/components';
import KPICard from './Card';
import { getAge } from 'bundles/queue/utilities/queue';

const compose = require('lodash')?.flowRight;

const Kpi = ({
  labResultNodes,
  labResultCount,
  highRiskNode,
  highRiskNodeCount,
  sampleCollectionNodes,
  sampleCollectionCount
}) => {

  const [tableData, setTableData ] = useState({hRNodes : [], sampleNodes: [], labResult: [], source: [] })
  const [currentState, setCurrentState] = useState('hRNodes')
  const renderPatientCell = row => (
    <PatientMetadatum
      name={`${row.patient.firstName} ${row.patient.lastName} `}
      sex={row.patient.sex}
      age={row.patient.age}
      riskLevel={row.patient.riskLevel ? capitalizeFirstWord(row.patient.riskLevel) : 'No'}
      textRowDirection="row"
    />
  );

  const renderTeamCell = row => (
    <TeamMetadatum
      text={row.patient.team}
      tagLabel={row.patient.status}
      spacing={{ mainText: 3, label: 3 }}
    />
  );

  const queueRemap = (data, lab) => {
    return {
      patient: {
        team: data.team,
        requestDate: new Date(
          data.scheduledDate || data.requestDate
        ).toDateString(),
        firstName: data.patientByPatientId.firstname,
        lastName: data.patientByPatientId.lastname,
        sex: data.patientByPatientId.sex,
        age: getAge(data.patientByPatientId.birthDate),
        riskLevel:
          data.patientByPatientId.patientCasesByPatientId.nodes.length > 0
            ? data.patientByPatientId.patientCasesByPatientId.nodes[
                data.patientByPatientId.patientCasesByPatientId.nodes.length - 1
              ].riskLevel
            : undefined,
        status:
          data.queueTaskStatusesByTaskId.nodes.length > 0
            ? data.queueTaskStatusesByTaskId.nodes[
                data.queueTaskStatusesByTaskId.nodes.length - 1
              ].status
            : 'no status'
      }
    };
  };

  const labResultRemap = data => {
    return data.labRequestStatusesByLabRequestId.nodes.reduce((acc, curr) => {
      const status = curr.status;
      const id = curr.id;
      const requestDate = new Date(curr.stateChangeDate).toDateString();
      const firstName =
        curr.labRequestByLabRequestId.patientByPatientId.firstname;
      const lastName =
        curr.labRequestByLabRequestId.patientByPatientId.lastname;
      const sex = curr.labRequestByLabRequestId.patientByPatientId.sex;
      const age = getAge(
        curr.labRequestByLabRequestId.patientByPatientId.birthDate
      );
      const riskLevel = curr.labRequestByLabRequestId.patientByPatientId.patientCasesByPatientId.nodes.map(
        item => item?.riskLevel
      )[0];

      acc['patient'] = {
        status,
        requestDate,
        firstName,
        lastName,
        sex,
        age,
        riskLevel
      };

      return acc;
    }, {});
  };

  const parseQueue = (highRiskNode, sampleCollectionNodes, labResultNodes) => {
    const hRNodes = highRiskNode.map(item => queueRemap(item));
    const sampleNodes = sampleCollectionNodes.map(item => queueRemap(item));
    const labResult = labResultNodes.map(lab => labResultRemap(lab));

    return {
      hRNodes,
      sampleNodes,
      labResult
    };
  };

  useEffect(() => {
    const { hRNodes, sampleNodes, labResult } = parseQueue(
      highRiskNode,
      sampleCollectionNodes,
      labResultNodes
    );
 
    if (highRiskNode.length && labResultNodes.length) {
      setTableData({ hRNodes, sampleNodes, labResult });
    }
  }, [highRiskNode, sampleCollectionNodes, labResultNodes]);

  const headers = [
    { name: 'PATIENT', accessor: renderPatientCell },
    { name: 'REQUEST DATE', accessor: 'patient.requestDate' },
    { name: 'WAIT TIME', accessor: 'patient.waitTime' },
    { name: 'TEAM', accessor: renderTeamCell }
  ];

  return (
    <Fragment>
      <Header
        pageTitle="KPI"
        contexts={{
          dateSelect: {
            spacing: 9,
            defaultValue: 'TODAY',
            options: ['TODAY', 'YESTERDAY'],
            handleInputChange: _newInput => {}
          }
        }}
      />
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              text="High risk patients awaiting pickup"
              count={highRiskNodeCount}
              buttonColor="#6EA915"
              buttonContent={<ExpandMore />}
              buttonOnClick={() => setCurrentState('hRNodes')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              text="Lab results pending for more than a day"
              count={labResultCount}
              buttonColor="#BF6E27"
              buttonContent="show"
              buttonOnClick={() => setCurrentState('labResult')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              text="high risk patients awaiting pickup for more than a day"
              count={highRiskNodeCount}
              buttonColor="#BF6E27"
              buttonContent="show"
              buttonOnClick={() => setCurrentState('hRNodes')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              text="Patients awaiting sample collection for more than a day"
              count={sampleCollectionCount}
              buttonColor="#BF6E27"
              buttonContent="show"
              buttonOnClick={() => setCurrentState('sampleNodes')}
            />
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 60 }} spacing={4}>
          <DataTable headers={headers} data={tableData[currentState]} />
        </Grid>
      </div>
    </Fragment>
  );
};

export default compose(connect(null, null), withKpiData)(Kpi);
