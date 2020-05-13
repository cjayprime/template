import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_PATIENT_CASE } from 'graphql/mutations/Case/createPatientCase';
const compose = require('lodash').flowRight;

const createPatientCases = WrappedComponent => {
  const createPatientCases = ({ createPatientCase, ...props }) => {
    return (
      <WrappedComponent createPatientCase={createPatientCase} {...props} />
    );
  };
  const createCase = graphql(CREATE_PATIENT_CASE, {
    name: 'createPatientCase'
  });
 
  return compose(createCase)(createPatientCases);
};

export default createPatientCases; 
