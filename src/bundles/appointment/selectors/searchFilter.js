
import { getAppointmentState } from './state';

export const getSearchText = (state) => getAppointmentState(state).getIn(['searchFilters', 'searchText']);

export const getStatus = (state) => getAppointmentState(state).getIn(['searchFilters', 'status']); 
 