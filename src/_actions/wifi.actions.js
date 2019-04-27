import { wifiConstants } from '../_constants';
import { wifiService } from '../_services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const wifiActions = {
    setWifiInfo,
    upload,
    selectSensor,
    uploadKey,
};

function setWifiInfo(ssid, pass) {
    return dispatch => {
        dispatch(request());

        wifiService.setWifiInfo(ssid, pass)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('error in setting wifi info!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('successfully set wifi info!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: wifiConstants.SET_WIFI_INFO_REQUEST } }
    function success(success) { return { type: wifiConstants.SET_WIFI_INFO_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.SET_WIFI_INFO_FAILURE, error } }
}



function upload(file) {
    return dispatch => {
        dispatch(request());

        wifiService.upload(file)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully uploaded!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in uploading!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: wifiConstants.UPLOAD_REQUEST } }
    function success(success) { return { type: wifiConstants.UPLOAD_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.UPLOAD_FAILURE, error } }
}

function uploadKey(key) {
    return dispatch => {
        dispatch(request());

        wifiService.uploadKey(key)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully uploaded!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in uploading!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: wifiConstants.UPLOAD_KEY_REQUEST } }
    function success(success) { return { type: wifiConstants.UPLOAD_KEY_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.UPLOAD_KEY_FAILURE, error } }
}

function selectSensor(sensor) {
    return dispatch => {

        wifiService.selectSensor(sensor)
            .then(
                ok => { 
                    toast('successfully set sensor!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    toast('error in setting sensor!', {
                        position: "bottom-right"
                      });
                }
            );
    };
}

