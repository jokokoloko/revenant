import toastr from 'toastr';
import apiLead from '../../../api/apiLead';
import { leads } from '../../../api/firebase';
import {
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
    return apiLead
        .leadAdd(form) // issue: check to see if this can return lead in callback function in case writing to firestore fails
        .then(() => {
            dispatch(leadSaveSuccess(form)); // issue: pass in lead from firestore api call
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

export const leadsLoadSuccess = (lead) => ({
    type: LEADS_LOAD_SUCCESS,
    lead,
});

export const leadsLoadFailure = (error) => ({
    type: LEADS_LOAD_FAILURE,
    error,
});

export const leadsLoad = (watch) => (dispatch) => {
    dispatch(leadsLoadRequest());
    return watch
        ? leads.orderBy('time.created', 'desc').onSnapshot(
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
