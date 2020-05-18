import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_DASHBOARD_DATA } from 'graphql/Dashboard/DashboardData';
import { buildQuery, buildOrder } from 'bundles/patient/utilities/search';
import Loader from 'bundles/shared/components/Loader';

const compose = require('lodash').flowRight;

export default WrappedComponent => {
  const WithDashboard = ({ ...props }) => {
    const {
      allDashboardData: { loading }
    } = props;
    if (loading) return <Loader status={true} />;

    return <WrappedComponent data={props.allDashboardData} {...props} />;
  };

  const WithDashboardData = graphql(ALL_DASHBOARD_DATA, {
    name: 'allDashboardData',
    options: ({ filter, orderBy, offset }) => ({
      variables: {
        filter,
        offset,
        orderBy
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

  return compose(connect(mapStateToProps), WithDashboardData)(WithDashboard);
};
