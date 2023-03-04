import { RECEIVE_USER_ERROR, RECEIVE_USER_RESPONSE, SEND_USER_REQUEST } from "./userTypes";

const userState = {
    loading: false,
    user: {},
    error: ""
}

const userReducer = (prevState = userState, action) => {
    switch (action.type) {
        case SEND_USER_REQUEST:
            return { ...prevState, loading: true }
        case RECEIVE_USER_RESPONSE:
            return { loading: false, user: action.payload, error: ""};
        case RECEIVE_USER_ERROR:
            return { loading: false, user: {}, error: action.payload};
        default:
            return prevState;
    }
}

export default userReducer;