import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { NEW_CALL_LOG } from 'graphql/mutations/Patient/NewCallLog';
const compose = require('lodash').flowRight;

const newCallLog = WrappedComponent => {
  const newCallLog = ({ newCallLog, ...props }) => {
    return <WrappedComponent newCallLog={newCallLog} {...props} />;
  };
  const newCallLogPG = graphql(NEW_CALL_LOG, {
    name: 'newCallLog'
  });

  return compose(newCallLogPG)(newCallLog);
};

export default newCallLog;
