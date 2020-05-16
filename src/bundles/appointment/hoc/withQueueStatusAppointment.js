import React from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import { ALL_QUEUE_TASK_STATUS } from 'graphql/Queue/QueueTaskStatus';
import { buildQuery, buildOrder, buildLabQuery } from 'bundles/appointment/utilities/search'; 
import Loader from 'bundles/shared/components/Loader';
const compose = require('lodash').flowRight;

const withQueueTaskStatus = WrappedComponent => {
  const withQueueTaskStatus = ({ allQueueTaskStatuses, ...props }) => {
    if (allQueueTaskStatuses.loading) return <Loader status={true} />

    let queueTask = [];
    let labTask = []

    if (!allQueueTaskStatuses.loading) {
      queueTask = allQueueTaskStatuses?.allQueueTaskStatuses?.nodes;
      labTask = allQueueTaskStatuses?.labRequets?.nodes;
    } 

    return <WrappedComponent queueTask={queueTask} labTask={labTask} {...props} />;
  };

  const withQueueTaskData = graphql(ALL_QUEUE_TASK_STATUS, {
    name: 'allQueueTaskStatuses',
    options: ({ filter, orderBy, offset, labFilter }) => ({
      variables: {
        filter,
        offset,
        orderBy,
        labFilter
      }
    })
  });

  const mapStateToProps = state => {
    const filter = buildQuery(state);
    const orderBy = buildOrder(state);
    const labFilter = buildLabQuery(state);

    return {
      filter,
      orderBy,
      labFilter
    };
  };

  return compose(connect(mapStateToProps), withQueueTaskData)(withQueueTaskStatus);
};

export default withQueueTaskStatus;