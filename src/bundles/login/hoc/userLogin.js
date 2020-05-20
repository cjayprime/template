import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { USER_LOGIN } from 'graphql/mutations/Login/UserLogin';
const compose = require('lodash').flowRight;

export const userLogin = WrappedComponent => {
  const userLogin = ({ userLogin, ...props }) => {
    return (
      <WrappedComponent
        userLoginPG={userLogin}
        {...props}
      />
    )
  }

  const userLoginPG = graphql(USER_LOGIN, {
    name: 'userLogin'
  });

  return compose(userLoginPG)(userLogin);
};
