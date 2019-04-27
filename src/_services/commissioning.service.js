export const commissioningService = {
    getCommissioningData,
    getCurrentTrackerInfo,
    triggerDiscovery,
};

const hostname = window.location.hostname + ':5000';

const hostnamexbee = window.location.hostname + ':5001';


function getCommissioningData() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostname}/getCommissioningData`, requestOptions)
        .then(handleResponse)
}

function getCurrentTrackerInfo(trackerID) {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostname}/getCurrentTrackerInfo?id=${trackerID}`, requestOptions)
        .then(handleResponse)
}

function triggerDiscovery() {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "CMD": "HINF",
            "DID": "00000",
        })
    };

    return fetch(`http://${hostnamexbee}/sendCommand`, requestOptions)
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
