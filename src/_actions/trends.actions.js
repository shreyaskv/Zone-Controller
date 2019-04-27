import { trendsConstants } from '../_constants';
import { trendsService } from '../_services';

export const trendsActions = {
    getTrends
};

function getTrends(trackers, parameter) {
    return dispatch => {
        dispatch(request(trackers, parameter));

        trendsService.getTrends(trackers, parameter)
            .then(
                trends => { 
                    dispatch(success(trends));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(trackers, parameter) { 
        const obj = { trackers: trackers, parameter: parameter }
        return { type: trendsConstants.GET_TRENDS_REQUEST, obj }
    }
    function success(trends) { return { type: trendsConstants.GET_TRENDS_SUCCESS, trends } }
    function failure(error) { return { type: trendsConstants.GET_TRENDS_FAILURE, error } }
}