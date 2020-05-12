import { getLocationState } from './state';

export const getLocation = (state) => getLocationState(state).get('availableBedLocation')