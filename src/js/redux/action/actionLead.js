import toastr from 'toastr';
import apiLead from '../../../api/apiLead';
import { authentication, leads } from '../../../api/firebase';
import {
    LEAD_ADD,
    LEAD_EDIT,
    LEAD_SAVE_REQUEST,
    LEAD_SAVE_SUCCESS,
    LEAD_SAVE_FAILURE,
    LEADS_LOAD_REQUEST,
    LEADS_LOAD_SUCCESS,
    LEADS_LOAD_FAILURE,
    LEADS_VOID,
} from '../type';

toastr.options.positionClass = 'toast-top-center';

// Save
export const leadAdd = () => ({
    type: LEAD_ADD,
});

export const leadEdit = () => ({
    type: LEAD_EDIT,
});

export const leadSaveRequest = () => ({
    type: LEAD_SAVE_REQUEST,
});

export const leadSaveSuccess = () => ({
    type: LEAD_SAVE_SUCCESS,
});

export const leadSaveFailure = (error) => ({
    type: LEAD_SAVE_FAILURE,
    error,
});

export const leadSave = (form) => (dispatch) => {
    dispatch(leadSaveRequest());
    return form.id
        ? apiLead
              .leadEdit(form)
              .then(() => {
                  dispatch(leadEdit());
                  dispatch(leadSaveSuccess());
                  toastr.success('Lead updated!');
              })
              .catch((error) => {
                  dispatch(leadSaveFailure(error));
                  toastr.error(error.message);
                  throw error;
              })
        : apiLead
              .leadAdd(form)
              .then(() => {
                  dispatch(leadAdd());
                  dispatch(leadSaveSuccess());
                  toastr.success('Lead added!');
              })
              .catch((error) => {
                  dispatch(leadSaveFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

// Load
export const leadsLoadRequest = () => ({
    type: LEADS_LOAD_REQUEST,
});

export const leadsLoadSuccess = (leads) => ({
    type: LEADS_LOAD_SUCCESS,
    leads,
});

export const leadsLoadFailure = (error) => ({
    type: LEADS_LOAD_FAILURE,
    error,
});

export const leadsLoad = (watch) => (dispatch) => {
    dispatch(leadsLoadRequest());
    return watch
        ? authentication.currentUser &&
              leads.orderBy('time.created', 'desc').onSnapshot(
                  (snapshot) => {
                      const leads = snapshot.docs.map((lead) => lead.data());
                      dispatch(leadsLoadSuccess(leads));
                  },
                  (error) => {
                      dispatch(leadsLoadFailure(error));
                      toastr.error(error.message);
                      throw error;
                  },
              )
        : apiLead
              .leadsLoad()
              .then((leads) => dispatch(leadsLoadSuccess(leads)))
              .catch((error) => {
                  dispatch(leadsLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

// Void
export const leadsVoid = () => ({
    type: LEADS_VOID,
});
