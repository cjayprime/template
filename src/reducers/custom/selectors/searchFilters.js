import { getRouterState } from './state';

export const getRouteConfig = (state, type = 'default') => getRouterState(state).get(type).toJS()