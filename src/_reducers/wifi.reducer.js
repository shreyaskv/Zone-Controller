import { wifiConstants } from '../_constants';

const initialState = {
  sending: false,
  sent:  false,
  sendingFile: false,
  sentFile:  false,
  sendingKey: false,
  sentKey:  false
}

export function wifi(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case wifiConstants.SET_WIFI_INFO_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false
      };
    case wifiConstants.SET_WIFI_INFO_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true
      };
    case wifiConstants.SET_WIFI_INFO_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
        sent: false
      };
    case wifiConstants.UPLOAD_REQUEST:
      return {
        ...state,
        sendingFile: true,
        sentFile: false
      };
    case wifiConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        sendingFile: false,
        sentFile: true
      };
    case wifiConstants.UPLOAD_FAILURE:
      return {
        ...state,
        sendingFile: false,
        error: action.error,
        sentFile: false
      };
      case wifiConstants.UPLOAD_KEY_REQUEST:
      return {
        ...state,
        sendingKey: true,
        sentKey: false
      };
    case wifiConstants.UPLOAD_KEY_SUCCESS:
      return {
        ...state,
        sendingKey: false,
        sentKey: true
      };
    case wifiConstants.UPLOAD_KEY_FAILURE:
      return {
        ...state,
        sendingKey: false,
        error: action.error,
        sentKey: false
      };
    default:
      return state
  }
}