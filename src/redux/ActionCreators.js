import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (courseId, rating, comment) => (dispatch) => {

    const newComment = {
        course: courseId,
        rating: rating,
        comment: comment
    }
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        })
}

export const fetchCourses = () => (dispatch) => {
    dispatch(coursesLoading(true));

    return fetch(baseUrl + 'courses')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(courses => dispatch(addCourses(courses)))
        .catch(error => dispatch(coursesFailed(error.message)));
}

export const coursesLoading = () => ({
    type: ActionTypes.COURSES_LOADING
});

export const coursesFailed = (errmess) => ({
    type: ActionTypes.COURSES_FAILED,
    payload: errmess
});

export const addCourses = (courses) => ({
    type: ActionTypes.ADD_COURSES,
    payload: courses
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'specials')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchDevelopers = () => (dispatch) => {

    dispatch(developersLoading());

    return fetch(baseUrl + 'developers')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(developers => dispatch(addDevelopers(developers)))
        .catch(error => dispatch(developersFailed(error.message)));
}

export const developersLoading = () => ({
    type: ActionTypes.DEVELOPERS_LOADING
});

export const developersFailed = (errmess) => ({
    type: ActionTypes.DEVELOPERS_FAILED,
    payload: errmess
});

export const addDevelopers = (developers) => ({
    type: ActionTypes.ADD_DEVELOPERS,
    payload: developers
});

export const postFeedback = (feedback) => (dispatch) => {

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n' + JSON.stringify(response)); })
        .catch(error => { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                
                dispatch(fetchUserInfos());
                // Dispatch the success action
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};




export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const postFavorite = (courseId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'enrolledCourses/' + courseId, {
        method: "POST",
        body: JSON.stringify({ "_id": courseId }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (courseId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'enrolledCourses/' + courseId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'enrolledCourses', {
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(favorites => dispatch(addFavorites(favorites)))
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});



export const fetchCourseItems = () => (dispatch) => {
    dispatch(courseItemsLoading(true));
    return fetch(baseUrl + 'courseItems')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(courseItems => dispatch(addCourseItems(courseItems)))
        .catch(error => dispatch(courseItemsFailed(error.message)));
}

export const courseItemsLoading = () => ({
    type: ActionTypes.COURSEITEMS_LOADING
});


export const courseItemsFailed = (errmess) => ({
    type: ActionTypes.COURSEITEMS_FAILED,
    payload: errmess
});

export const addCourseItems = (courseItems) => ({
    type: ActionTypes.ADD_COURSEITEMS,
    payload: courseItems
});



export const signupUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignup())

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                
                dispatch(receiveSignup(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(signupError(error.message)))
};

export const requestSignup = () => {
    return {
        type: ActionTypes.SIGNUP_REQUEST
    }
}

export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS
    }
}

export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}



export const fetchUserInfos = () => (dispatch) => {
    dispatch(userInfosLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/', {
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(userinfos => dispatch(addUserInfos(userinfos)))
        .catch(error => dispatch(userInfosFailed(error.message)));
};




export const userInfosLoading = () => ({
    type: ActionTypes.USERINFOS_LOADING
});

export const userInfosFailed = (errmess) => ({
    type: ActionTypes.USERINFOS_FAILED,
    payload: errmess
});

export const addUserInfos = (userinfos) => ({
    type: ActionTypes.ADD_USERINFOS,
    payload: userinfos
});





export const postAddCourse = (course) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'courses', {
        method: "POST",
        body: JSON.stringify(course),
        headers: {
            'Authorization': bearer,
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {console.log('course', response); alert('Courseadded!\n' + JSON.stringify(response));dispatch(fetchCourses());})
        .catch(error => { console.log('course', error.message); alert('Your course could not be posted\nError: ' + error.message); });
};


export const postImageUpload = (image) => (dispatch) => {

    const formData = new FormData()
    formData.append(
        'imageFile',
        image,
        image.name
    );
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'imageUpload', {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {console.log('image', response); alert('image Uploaded!\n' + JSON.stringify(response));})
        .catch(error => { console.log('image', error.message); alert('Your image could not be posted\nError: ' + error.message); });
};




export const postAddCourseItem = (courseId, video, title, duration) => (dispatch) => {

    const newCourseItem = {
        course: courseId,
        title: title,
        video: video,
        duration: duration
    }
    console.log('CourseItem ', newCourseItem);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'courseItems', {
        method: 'POST',
        body: JSON.stringify(newCourseItem),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => {console.log('courseItem', response); alert('CourseItemadded!\n' + JSON.stringify(response));dispatch(fetchCourseItems());})
        .catch(error => {
            console.log('Post courseItems ', error.message);
            alert('Your courseItem could not be posted\nError: ' + error.message);
        })
}



export const postVideoUpload = (video) => (dispatch) => {

    const formData = new FormData()
    formData.append(
        'videoFile',
        video
    );
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'videoUpload', {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {console.log('video', response); alert('video Uploaded!\n' + JSON.stringify(response));})
        .catch(error => { console.log('video', error.message); alert('Your video could not be posted\nError: ' + error.message); });
};