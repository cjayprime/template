import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_LAB_REQUEST_STATUS } from 'graphql/mutations/Lab/CreateLabRequestStatus';
const compose = require('lodash').flowRight;

const createLabRequestStatus = WrappedComponent => {
  const createLabRequestStatus = ({ createLabRequestStatus, ...props }) => {
    return (
      <WrappedComponent
        createLabRequestStatus={createLabRequestStatus}
        {...props}
      />
    );
  };
  const createLabRequestStatusPG = graphql(CREATE_LAB_REQUEST_STATUS, {
    name: 'createLabRequestStatus'
  });

  return compose(createLabRequestStatusPG)(createLabRequestStatus);
};

export default createLabRequestStatus;
