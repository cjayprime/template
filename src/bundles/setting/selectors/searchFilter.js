import { getSettingsState } from './state';

export const getTeamFilter = state =>
  getSettingsState(state).getIn(['filters', 'staff', 'team']);

export const getUser = state => getSettingsState(state).get('user'); 

export const getUserId = state => getSettingsState(state).get('id');

export const getLogout = state => getSettingsState(state).get('logout');
