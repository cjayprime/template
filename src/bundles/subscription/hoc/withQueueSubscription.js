import React from 'react';
import { connect } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';
import { QUEUE_SUBSCRIPTION } from 'graphql/Subscription/queueSubscription';

const compose = require('lodash').flowRight;

const withQueueSubscription = WrappedComponent => {
 
  return class  withQueueSubscription extends React.PureComponent  {

  
  
    render() {
      const { data, loading } = useSubscription(QUEUE_SUBSCRIPTION)

      debugger
      return (
        <WrappedComponent />
      )
    }
    
  }
 //  return compose(connect(null))(withQueueSubscription);
};

export default withQueueSubscription;

/*
const DontReadTheComments = ({ repoFullName }) => (
  <Subscription subscription={QUEUE_SUBSCRIPTION} variables={{ repoFullName }}>
    {({ data: { commentAdded }, loading }) => (
      <h4>New comment: {!loading && commentAdded.content}</h4>
    )}
  </Subscription>
); */
