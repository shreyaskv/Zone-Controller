import { trendsConstants } from '../_constants';

const initialState = {
  requesting: false,
  trends: null,
  loaded:  false,
  trackers: [],
  parameter: ""
}

export function trends(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case trendsConstants.GET_TRENDS_REQUEST:
      return {
        ...state,
        requesting: true,
        loaded: false,
        trackers: action.obj.trackers,
        parameters: action.obj.parameter
      };
    case trendsConstants.GET_TRENDS_SUCCESS:
    {console.log(action.trends);
      return {
        ...state,
        requesting: false,  
        trends: action.trends,
        loaded: true
      };
    }
    case trendsConstants.GET_TRENDS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.error,
        loaded: false
      };
    default:
      return state
  }
}