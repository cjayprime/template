import ThemeOptions from './ThemeOptions';
import router from './custom/index';
import patient from 'bundles/patient/reducer';
import queue from 'bundles/queue/reducer';
import location from 'bundles/location/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  ThemeOptions,
  patient,
  queue,
  location,
  router
}) 
