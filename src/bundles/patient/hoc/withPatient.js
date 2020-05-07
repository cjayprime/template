import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_PATIENTS } from 'graphql/Patient/PatientData.js';
import { buildQuery, buildOrder } from 'bundles/patient/utilities/search';
import Loader from 'bundles/shared/components/Loader';

const compose = require('lodash').flowRight;

const withPatient = WrappedComponent => {
  const withPatients = ({ ...props }) => {
    const {
      allPatients: { loading }
    } = props;
    if (loading) return <Loader status={true} />;

    const {
      allPatients: { nodes }
    } = props.allPatients;

    return <WrappedComponent patients={nodes} {...props} />;
  };

  const withPatientData = graphql(ALL_PATIENTS, {
    name: 'allPatients',
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

  return compose(connect(mapStateToProps), withPatientData)(withPatients);
};

export default withPatient;
