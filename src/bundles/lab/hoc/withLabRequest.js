import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_LAB_REQUEST } from 'graphql/Lab/LabRequest';
import { buildQuery, buildOrder } from 'bundles/lab/utilities/search';
import Loader from 'bundles/shared/components/Loader';
const compose = require('lodash').flowRight;

const withLabRequest = WrappedComponent => {
  const withLabRequest = ({ allLabRequest, ...props }) => {
    if (allLabRequest.loading) return <Loader status={true} />

    let labRequests = [];

    if (!allLabRequest.loading) {
      labRequests = allLabRequest.allLabRequests.nodes;
    }

    return <WrappedComponent labRequests={labRequests} {...props} />;
  };

  const withLabRequestData = graphql(ALL_LAB_REQUEST, {
    name: 'allLabRequest',
    // options: ({ filter, orderBy, offset }) => ({
    //   variables: {
    //     filter,
    //     offset,
    //     orderBy
    //   }
    // })
  });

  // const mapStateToProps = state => {
  //   const filter = buildQuery(state);
  //   const orderBy = buildOrder(state);

  //   return {
  //     filter,
  //     orderBy
  //   };
  // };

  return compose(connect(null), withLabRequestData)(withLabRequest);
};

export default withLabRequest;
