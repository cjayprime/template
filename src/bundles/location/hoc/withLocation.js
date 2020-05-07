import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_LOCATION } from 'graphql/Location/LocationData';
import { buildQuery, buildOrder } from 'bundles/location/utilities/search';
import Loader from 'bundles/shared/components/Loader';

const compose = require('lodash').flowRight;

const withLocation = WrappedComponent => {
  const withLocation = ({ allLocations, ...props }) => {
      
    if (allLocations.loading) return <Loader status={true} />

    let locationPG = [];

    if (!allLocations.loading) {
      locationPG = allLocations.allLocations.nodes;
    }

    return <WrappedComponent locationData={locationPG} {...props} />;
  };

  const withLocationData = graphql(ALL_LOCATION, {
    name: 'allLocations',
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

  return compose(connect(mapStateToProps), withLocationData)(withLocation);
};

export default withLocation;
