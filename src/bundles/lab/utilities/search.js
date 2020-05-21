import Immutable from 'immutable';
import { searchFilter } from 'bundles/lab/selectors';
import { SORT_ENUM } from 'bundles/lab/constants';

export const buildOrder = state => {
  let sortEnum = [SORT_ENUM];

  return sortEnum;
};

export const buildQuery = state => {
  let pgQuery = Immutable.Map({});

};