export const trendsService = {
    getTrends,
};

const hostName = '192.168.0.47'+ ':5000';

function getTrends( trackers, parameter ) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "trackerId": trackers,
            "parameter": parameter
        })
    };




    return fetch(`http://${hostName}/trends`, requestOptions)
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
