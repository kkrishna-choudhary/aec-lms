import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Courses } from './courses';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Developers } from './developers';
import { favorites } from './favorites';
import { CourseItems } from './courseItems';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            courses: Courses,
            comments: Comments,
            promotions: Promotions,
            developers: Developers,
            courseItems: CourseItems,
            auth: Auth,
            favorites,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}