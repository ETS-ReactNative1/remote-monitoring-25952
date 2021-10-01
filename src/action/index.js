
export function ADD_DEVICE_FUNCTION(data) {
    return {
        type: 'ADD_DEVICE',
        payload: data
    }
}


export function REMOVE_DEVICE_FUNCTION() {
    return {
        type: 'REMOVE_DEVICE',
        payload: []
    }
}

