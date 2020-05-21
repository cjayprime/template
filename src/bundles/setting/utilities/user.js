import Immutable from 'immutable';
import * as filters from 'bundles/setting/selectors';
import { SORT_ENUM } from 'bundles/setting/constants';

export const buildOrder = state => [...Object.values(SORT_ENUM).flat()];

export const buildQuery = state => {
  const id = filters.getUserId(state)

  return id
}
 