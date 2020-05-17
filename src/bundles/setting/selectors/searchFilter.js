import { getSettingsState } from './state';

export const getTeamFilter = state =>
  getSettingsState(state).getIn(['filters', 'staff', 'team']);
