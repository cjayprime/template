import ThemeOptions from './ThemeOptions';
import router from './custom/index';
import patient from 'bundles/patient/reducer';
import queue from 'bundles/queue/reducer';
import settings from 'bundles/setting/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  ThemeOptions,
  patient,
  queue,
  settings,
  router
})
