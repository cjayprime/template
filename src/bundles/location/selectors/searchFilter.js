import { getLocationState } from './state';

export const getLocation = (state) => getLocationState(state).get('availableBedLocation');

export const getSelected = (state) => getLocationState(state).get('selectedLocation');
