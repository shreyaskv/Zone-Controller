import { commandsConstants } from '../_constants';

const initialState = {
  sending: false,
  sent:  false
}

export function commands(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case commandsConstants.SEND_COMMAND_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false
      };
    case commandsConstants.SEND_COMMAND_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true
      };
    case commandsConstants.SEND_COMMAND_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
        sent: false
      };
    default:
      return state
  }
}