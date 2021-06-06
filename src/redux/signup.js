import * as ActionTypes from './ActionTypes';

export const Signup = (state = {
        isLoading: false,
        isSucces:  false,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return {...state,
                isLoading: true,
                isSuccess: false
            };
        case ActionTypes.SIGNUP_SUCCESS:
            return {...state,
                isLoading: false,
                isSuccess: true,
                errMess: ''
            };
        case ActionTypes.SIGNUP_FAILURE:
            return {...state,
                isLoading: false,
                isSuccess: false,
                errMess: action.message
            }
        default:
            return state
    }
}