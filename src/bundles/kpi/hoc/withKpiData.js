import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { KPI } from 'graphql/KPI/kpiData';
import { buildQuery, buildOrder } from 'bundles/kpi/utilities/search';
import Loader from 'bundles/shared/components/Loader';

const compose = require('lodash').flowRight;

const withKPI = WrappedComponent => {
  const withKPI = ({ allKPI, ...props }) => {

    const { loading } = allKPI;
    if (loading) return <Loader status={true} />;

    const {
      highRiskPatientPickup,
      labsResultPending,
      sampleCollection
    } = allKPI;

    const highRiskNode = highRiskPatientPickup.nodes;
    const highRiskNodeCount = highRiskPatientPickup.totalCount;
    const labResultNodes = labsResultPending.nodes;
    const labResultCount = labsResultPending.totalCount;
    const sampleCollectionNodes = sampleCollection.nodes;
    const sampleCollectionCount = sampleCollection.totalCount;

    return (
      <WrappedComponent
        labResultNodes={labResultNodes}
        labResultCount={labResultCount}
        highRiskNode={highRiskNode}
        highRiskNodeCount={highRiskNodeCount}
        sampleCollectionNodes={sampleCollectionNodes }
        sampleCollectionCount={sampleCollectionCount}
        {...props}
      />
    );
  };

  const withKPIData = graphql(KPI, {
    name: 'allKPI',
    options: ({ filter, orderBy, offset }) => ({
      variables: {
        offset
      }
    })
  });

  const mapStateToProps = state => {
    const filter = buildQuery(state);
    const orderBy = buildOrder(state);

    return {
      filter,
      orderBy
    };
  };

  return compose(connect(mapStateToProps), withKPIData)(withKPI);
};

export default withKPI;
