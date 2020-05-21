import { getQueueState } from './state';

export const getTeam = (state) => getQueueState(state).getIn(['searchFilters', 'team']);