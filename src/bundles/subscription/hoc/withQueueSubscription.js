import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';
import { QUEUE_SUBSCRIPTION } from 'graphql/Subscription/queueSubscription';

export default () => {
  const [data, setData] = useState({})
  const subs = useSubscription(QUEUE_SUBSCRIPTION, { 
    onSubscriptionData: (e) => {
      console.log(e.subscriptionData)
    }, 
   })

  return data
}
