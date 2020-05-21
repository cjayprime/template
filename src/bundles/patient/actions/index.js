import { actionTypes } from 'bundles/patient/constants';

export const searchText = value => ({
  type: actionTypes.ADD_SEARCH,
  payload: { value }
});

export const toggleFilter = (key, value) => ({
  type: actionTypes.TOGGLE_FILTER,
  payload: { key, value }
});

export const saveCurrentPatient = (value) => ({
  type: actionTypes.CURRENT_PATIENT,
  payload: { value }
})
