import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_TRIAGE_ANSWERS } from 'graphql/mutations/Triage/createTriageAnswers';
const compose = require('lodash').flowRight;

const createTriageAnswers = WrappedComponent => {
  const createTriageAnswers = ({ createTriageAnswers, ...props }) => {
    return (
      <WrappedComponent createTriageAnswers={createTriageAnswers} {...props} />
    );
  };
  const createTriage = graphql(CREATE_TRIAGE_ANSWERS, {
    name: 'createTriageAnswers'
  });

  return compose(createTriage)(createTriageAnswers);
};

export default createTriageAnswers;
