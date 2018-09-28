import toastr from 'toastr';
import apiUser from '../../../api/apiUser';
import { authentication, users } from '../../../api/firebase';
import { USERS_LOAD_REQUEST, USERS_LOAD_SUCCESS, USERS_LOAD_FAILURE, USERS_VOID } from '../type';

toastr.options.positionClass = 'toast-top-center';

// Load
export const usersLoadRequest = () => ({
    type: USERS_LOAD_REQUEST,
});

export const usersLoadSuccess = (users) => ({
    type: USERS_LOAD_SUCCESS,
    users,
});

export const usersLoadFailure = (error) => ({
    type: USERS_LOAD_FAILURE,
    error,
});

export const usersLoad = (watch) => (dispatch) => {
    dispatch(usersLoadRequest());
    return watch
        ? authentication.currentUser &&
              users.orderBy('time.created', 'desc').onSnapshot(
                  (snapshot) => {
                      const users = snapshot.docs.map((user) => user.data());
                      dispatch(usersLoadSuccess(users));
                  },
                  (error) => {
                      dispatch(usersLoadFailure(error));
                      toastr.error(error.message);
                      throw error;
                  },
              )
        : apiUser
              .usersLoad()
              .then((users) => dispatch(usersLoadSuccess(users)))
              .catch((error) => {
                  dispatch(usersLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

// Void
export const usersVoid = () => ({
    type: USERS_VOID,
});
