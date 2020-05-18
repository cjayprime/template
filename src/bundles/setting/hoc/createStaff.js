import React from 'react';
import { graphql } from '@apollo/react-hoc';
import {
  CREATE_STAFF,
  UPDATE_STAFF
} from '../../../graphql/mutations/Staff/CreateStaff';
const compose = require('lodash').flowRight;

export const createStaff = WrappedComponent => {
  const createStaff = ({ createStaff, updateStaff, ...props }) => {
    return (
      <WrappedComponent
        createStaffPG={createStaff}
        updateStaffPG={updateStaff}
        {...props}
      />
    );
  };
  const createStaffPG = graphql(CREATE_STAFF, {
    name: 'createStaff'
  });

  const updateStaffPG = graphql(UPDATE_STAFF, {
    name: 'updateStaff'
  });

  return compose(createStaffPG, updateStaffPG)(createStaff);
};
