export const wifiService = {
    setWifiInfo,
    upload,
    selectSensor,
    uploadKey,
};

const hostName = '192.168.0.47'+ ':5000';

function setWifiInfo(ssid, pass) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "ssid": ssid,
            "password": pass
        })
    };

    return fetch(`http://${hostName}/setWifiInfo`, requestOptions)
        .then(handleResponse)
}

function upload(file) {
    var data = new FormData()
    console.log(file);
    data.append('file', file)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: data
    };

    return fetch(`http://${hostName}/loadStaticData`, requestOptions)
        .then(handleResponse)
}

function uploadKey(key) {
    var data = new FormData()
    console.log(key);
    data.append('key', key)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: key
    };

    console.log(requestOptions);
    return fetch(`http://${hostName}/loadBigQueryKey`, requestOptions)
        .then(handleResponse)
}

function selectSensor(sensor) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "windSensor": sensor,
        })
    };

    console.log(requestOptions);

    return fetch(`http://${hostName}/selectSensor`, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            if (response.status === 403) {
                console.log("403")
                localStorage.removeItem('user')
                window.location.reload(true);
            }

            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        }
        return json;
    });
}
