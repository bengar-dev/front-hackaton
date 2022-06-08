const INITIAL_STATE = {
    productArray: []
}

function productReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETPRODUCTSARRAY': {
            return {
                ...state,
                productArray: action.payload
            }   
        }
    }

    return state
}

export default productReducer