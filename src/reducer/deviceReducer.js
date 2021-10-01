


const deviceReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_DEVICE':
            const { payload } = action;
            if (payload && !state.find((dev) => dev.id === payload.id)) {
              return [...state, payload];
            }
            return state;
        case 'REMOVE_DEVICE':
            return [];
       
    }
    return state
}
export default deviceReducer;