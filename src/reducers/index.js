import ThemeOptions from './ThemeOptions';
import patient from 'bundles/patient/reducer';
import queue from 'bundles/queue/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  ThemeOptions,
  patient,
  queue
})
