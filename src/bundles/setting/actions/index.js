import { actionTypes } from 'bundles/setting/constants';

export const logout = value => ({
  type: actionTypes.LOGOUT,
  payload: { value }
})

export const searchText = value => ({
  type: actionTypes.ADD_SEARCH,
  payload: { value }
});

export const toggleFilter = (key, value) => ({
  type: actionTypes.TOGGLE_FILTER,
  payload: { key, value }
});

export const saveCurrentUser = (value) => ({
  type: actionTypes.ADD_USER,
  payload: { value }
});

export const saveCurrentId = (value) => ({
  type: actionTypes.ADD_ID,
  payload: { value }
});
