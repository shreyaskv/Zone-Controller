const initialState = {
    trackerColor:"",
}


     export function extra(state, action) {
        if (typeof state === 'undefined') {
          return initialState
        }
        switch (action.type) {
          case 'setTrackerColor':
            return {
              ...state,
                trackerColor: action.payload
            };
          default:
            return state
        }
      }
