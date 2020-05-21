import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { saveCurrentUser } from 'bundles/setting/actions';
import { SINGLE_STAFF } from 'graphql/Settings/Staff/StaffData.js';
import { buildQuery } from 'bundles/setting/utilities/user';
import Loader from 'bundles/shared/components/Loader';

const compose = require('lodash').flowRight;

const withSingleStaff = WrappedComponent => {
  const withSingleStaff = ({ withSingleStaff, saveUser, ...props }) => {

    if(props?.withSingleStaff?.loading) return  <Loader status={true} />;
    // const {
    //   withSingleStaff: { loading }
    // } = props;
    // if (loading) return <Loader status={true} />;

     const {
      userById
     } = withSingleStaff;

    if(userById?.id) saveUser(userById)

    return <WrappedComponent staff={userById} {...props} />;
  };

  const withSingleStaffData = graphql(SINGLE_STAFF, {
    name: 'withSingleStaff',
    options: ({ id }) => ({
      variables: {
        id,
      }
    })
  }); 

  const mapDispatchToProps = dispatch => ({
    saveUser: value => dispatch(saveCurrentUser(value)),
  });
  

  const mapStateToProps = state => {
    const id = buildQuery(state);

    return {
      id
    };
  };

  return compose(connect(mapStateToProps, mapDispatchToProps), withSingleStaffData)(withSingleStaff);
};

export default withSingleStaff;