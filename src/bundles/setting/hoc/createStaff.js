import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_STAFF } from '../../../graphql/mutations/Staff/CreateStaff';
const compose = require('lodash').flowRight;

export const createStaff = WrappedComponent => {
  const createStaff = ({ createStaff, ...props }) => {
    return <WrappedComponent createStaffPG={createStaff} {...props} />;
  };
  const createStaffPG = graphql(CREATE_STAFF, {
    name: 'createStaff'
  });

  return compose(createStaffPG)(createStaff);
};
