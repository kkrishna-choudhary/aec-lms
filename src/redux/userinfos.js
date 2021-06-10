
import * as ActionTypes from "./ActionTypes";

export const UserInfos = (state = {
    isLoading: true,
    errmess: null,
    userInfos:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERINFOS:
            return { ...state, isLoading: false, errmess: null, userInfos: action.payload }

        case ActionTypes.USERINFOS_LOADING:
            return { ...state, isLoading: true, errmess: null, userInfos: [] }

        case ActionTypes.USERINFOS_FAILED:
            return { ...state, isLoading: false, errmess: action.payload, userInfos: [] }


        default:
            return state;
    }
}