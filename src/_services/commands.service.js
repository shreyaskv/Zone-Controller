export const commandsService = {
    sendCommand
};

const hostName = '192.168.0.47'+ ':5001';
//const hostName = 'https://ancient-catfish-90.localtunnel.me';

function sendCommand(deviceID, command, macID) {

    const requestOptions = {
        method: "POST",
        mode: 'cors'
    };

    console.log(macID);

    if(command === "WE" && macID === '00000'){
            requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": deviceID,
                "VALUES": "NEGATIVE",
            });
        }

    if(command === "SMTALStow" && macID === '00000'){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMOD",
                "DID": deviceID,
                "MODE": "NIGHT",
            });
    }

    if(command === "SMTALStop" && macID === '00000'){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": deviceID,
                "VALUES": "STOP",
            });
    }

    if(command === "ES" && macID === '00000'){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": deviceID,
                "VALUES": "POSITIVE",
            });
    }

    if(command === "WE" && macID !== '00000'){
        requestOptions["body"] = JSON.stringify({
            "CMD" : "HMNM",
            "DID": deviceID,
            "VALUES": "NEGATIVE",
            "macID": macID,
        });
    }

if(command === "SMTALStow" && macID !== '00000'){
    requestOptions["body"] = JSON.stringify({
            "CMD" : "HMOD",
            "DID": deviceID,
            "MODE": "NIGHT",
            "macID": macID,
        });
}

if(command === "SMTALStop" && macID !== '00000'){
    requestOptions["body"] = JSON.stringify({
            "CMD" : "HMNM",
            "DID": deviceID,
            "VALUES": "STOP",
            "macID": macID,
        });
}

if(command === "ES" && macID !== '00000'){
    requestOptions["body"] = JSON.stringify({
            "CMD" : "HMNM",
            "DID": deviceID,
            "VALUES": "POSITIVE",
            "macID": macID,
        });
}

if(command === "SMTALReset"){
    requestOptions["body"] = JSON.stringify({
            "CMD" : "RESET",
            "DID": "00000",
        });
}

    console.log(requestOptions);

    return fetch(`http://${hostName}/sendCommand`, requestOptions)
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
