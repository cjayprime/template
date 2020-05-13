import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_DECEASED_PATIENT } from 'graphql/mutations/Patient/MarkPatientDead';
const compose = require('lodash').flowRight;

const markPatientDeceased = WrappedComponent => {
  const markPatientDeceased = ({ markPatientDeceased, ...props }) => {
    return (
      <WrappedComponent markPatientDeceased={markPatientDeceased} {...props} />
    );
  };
  const markPatientDeceasedPG = graphql(CREATE_DECEASED_PATIENT, {
    name: 'markPatientDeceased'
  });

  return compose(markPatientDeceasedPG)(markPatientDeceased);
};

export default markPatientDeceased;
