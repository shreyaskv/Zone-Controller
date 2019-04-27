import { combineReducers } from 'redux';

import { authentication } from './users.reducer';
import { alert } from './alert.reducer';
import { commissioning } from './commissioning.reducer'
import { commands } from './commands.reducer'
import { wifi } from './wifi.reducer'
import { trends } from './trends.reducer'
import { settings } from './settings.reducer'
import { extra } from './extra.reducer.js'

const rootReducer = combineReducers({
  authentication,
  alert,
  commissioning,
  commands,
  wifi,
  trends,
  settings,
  extra
});

export default rootReducer;