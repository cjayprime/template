import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_STAFF } from 'graphql/Settings/Staff/StaffData';
import { buildQuery, buildOrder } from 'bundles/setting/utilities/search';
import Loader from 'bundles/shared/components/Loader';
import { flowRight as compose } from 'lodash';

export const withStaff = WrappedComponent => {
  const ConnectedStaffComponent = ({ allStaff, ...props }) => {
    if (allStaff.loading) return <Loader status={true} />;
    const { allUsers: staffConnection } = allStaff;
    const staffCursor = [...(staffConnection ? staffConnection.nodes : [])];
    return <WrappedComponent staffData={staffCursor} />;
  };

  const withStaffData = graphql(ALL_STAFF, {
    name: 'allStaff',
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

  return compose(
    connect(mapStateToProps),
    withStaffData
  )(ConnectedStaffComponent);
};
