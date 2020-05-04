import { getPatientState } from './state';

export const getSearchText = (state) => getPatientState(state).getIn(['searchFilters', 'searchText'])