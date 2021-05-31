import * as ActionTypes from './ActionTypes';

export const Developers = (state  = { isLoading: true,
                                    errMess: null,
                                    developers:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEVELOPERS:
        return {...state, isLoading: false, errMess: null, developers: action.payload};

        case ActionTypes.DEVELOPERS_LOADING:
            return {...state, isLoading: true, errMess: null, developers: []}

        case ActionTypes.DEVELOPERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload,developers: []};

        default:
          return state;
    }
};