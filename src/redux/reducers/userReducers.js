const INITIAL_STATE = {
    userInfo: {
        id: "",
        username: "",
        email: ""
    }
}

function userReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETUSERINFO': {
            return {
                ...state,
                userInfo: action.payload
            }
        }
    }

    return state
}

export default userReducer