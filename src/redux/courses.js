import * as ActionTypes from "./ActionTypes";

export const Courses = (state = {
    isLoading: true,
    errmess: null,
    courses: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COURSES:
            return { ...state, isLoading: false, errmess: null, courses: action.payload }

        case ActionTypes.COURSES_LOADING:
            return { ...state, isLoading: true, errmess: null, courses: [] }

        case ActionTypes.COURSES_FAILED:
            return { ...state, isLoading: false, errmess: action.payload, courses: [] }


        default:
            return state;
    }
}