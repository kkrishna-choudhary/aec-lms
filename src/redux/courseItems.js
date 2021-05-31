import * as ActionTypes from "./ActionTypes";

export const CourseItems = (state = {
    isLoading: true,
    errmess: null,
    courseItems: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COURSEITEMS:
            return { ...state, isLoading: false, errmess: null, courseItems: action.payload }

        case ActionTypes.COURSEITEMS_LOADING:
            return { ...state, isLoading: true, errmess: null, courseItems: [] }

        case ActionTypes.COURSEITEMS_FAILED:
            return { ...state, isLoading: false, errmess: action.payload, courseItems: [] }


        default:
            return state;
    }
}