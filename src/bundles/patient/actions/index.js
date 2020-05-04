import { actionTypes } from 'bundles/patient/constants';

export const searchText = (value) => ({
  type: actionTypes.ADD_SEARCH,
  payload: { value }
});

