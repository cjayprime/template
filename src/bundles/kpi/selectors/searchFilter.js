import { getKPIState } from './state';

export const getSearchText = (state) => getKPIState(state).getIn(['searchFilters', 'searchText'])