import toastr from 'toastr';
import { ajaxCallBegin, ajaxCallError } from './actionAjax';
import { USER_ADD_SUCCESS, USERS_LOAD_SUCCESS } from '../type';
import apiUser from '../../../api/apiUser';

// Save
export const userAddSuccess = (user) => ({
    type: USER_ADD_SUCCESS,
    user,
});

// Load
export const usersLoadSuccess = (users) => ({
    type: USERS_LOAD_SUCCESS,
    users,
});

export const usersLoad = () =>
    // used in index.js
    (dispatch) => {
        dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
        return apiUser
            .usersLoad()
            .then((users) => {
                // function from API (requires return)
                dispatch(usersLoadSuccess(users));
            })
            .catch((error) => {
                dispatch(ajaxCallError(error));
                toastr.error(error.message);
                throw error;
            });
    };
