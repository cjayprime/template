import React, { lazy } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...props}) => {
  
  const token = localStorage.getItem('Tokens::Authorization')
  return (
    <Route
        {...props} 
        render={(props) => (
          token?.length 
            ? <Component {...props} />
            : <Redirect to="/login" />
        )
      
      }
    />
  )
}

export default withRouter((PrivateRoute));