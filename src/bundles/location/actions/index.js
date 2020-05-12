import { actionTypes } from 'bundles/location/constants';
 
export const addBedLocation = value => ({
  type: actionTypes.ADD_AVAILABLE_BED_LOCATION,
  payload: { value }
});  
