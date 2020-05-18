import Immutable from 'immutable';
import * as filters from 'bundles/setting/selectors';
import { SORT_ENUM } from 'bundles/setting/constants';

export const buildOrder = state => [...Object.values(SORT_ENUM).flat()];

export const buildQuery = state =>
  Immutable.Map({
    team: Immutable.Map({
      ...filters.getTeamFilter(state)
    })
  }).toJS();
