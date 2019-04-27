import { commandsConstants } from '../_constants';
import { commandsService } from '../_services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const commandsActions = {
    sendCommand
};

function sendCommand(deviceID, command, macID) {
    return dispatch => {
        dispatch(request());

        commandsService.sendCommand(deviceID, command, macID)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully sent message!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in sending message!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: commandsConstants.SEND_COMMAND_REQUEST } }
    function success(success) { return { type: commandsConstants.SEND_COMMAND_SUCCESS, success } }
    function failure(error) { return { type: commandsConstants.SEND_COMMAND_FAILURE, error } }
}