const INITIAL_STATE = {
    productArray: [],
    productsCompare: []
}

function productReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETPRODUCTSARRAY': {
            return {
                ...state,
                productArray: action.payload
            }   
        }

        case 'PRODUCTSCOMPARE': {

            return {
                ...state,
                productsCompare: action.payload
            }
        }
    }

    return state
}

export default productReducer