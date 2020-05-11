import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { CREATE_QUEUE_TASK_STATUS } from 'graphql/mutations/Queue/CreateQueueTask';
const compose = require('lodash').flowRight;

const createQueueTaskStatus = WrappedComponent => {
  const createQueueTaskStatus = ({ createQueueTaskStatus, ...props }) => {
    return (
      <WrappedComponent
        createQueueTaskStatus={createQueueTaskStatus}
        {...props}
      />
    );
  };
  const createQueueTaskPG = graphql(CREATE_QUEUE_TASK_STATUS, {
    name: 'createQueueTaskStatus'
  });

  return compose(createQueueTaskPG)(createQueueTaskStatus);
};

export default createQueueTaskStatus;
