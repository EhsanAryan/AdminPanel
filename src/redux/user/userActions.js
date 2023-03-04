import { getUserService } from "../../services/authServices";
import { RECEIVE_USER_ERROR, RECEIVE_USER_RESPONSE, SEND_USER_REQUEST } from "./userTypes"

export const sendUserRequestAction = () => {
    return {
        type: SEND_USER_REQUEST
    };
}

export const receiveUserResponseAction = (data) => {
    return {
        type: RECEIVE_USER_RESPONSE,
        payload: data
    };
}

export const receiveUserErrorAction = (error) => {
    return {
        type: RECEIVE_USER_ERROR,
        payload: error
    }
}

export const getUserDispatchRedux = () => {
    return (dispatch, state) => {
        dispatch(sendUserRequestAction());
        getUserService()
        .then(response => {
            if(response.status === 200) {
                dispatch(receiveUserResponseAction(response.data));
            } else {
                dispatch(receiveUserErrorAction(response.data.message));
            }
        })
        .catch(error => {
            dispatch(receiveUserErrorAction(error.message));
        });
    }
}