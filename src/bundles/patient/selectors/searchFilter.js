import { getPatientState } from './state';

export const getSearchText = (state) => getPatientState(state).getIn(['searchFilters', 'searchText'])

export const getLGA = (state) => getPatientState(state).getIn(['searchFilters', 'LGA'])

export const getCurrentPatient = (state) => getPatientState(state).get('currentPatient') 