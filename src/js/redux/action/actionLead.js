import toastr from 'toastr';
import apiLead from '../../../api/apiLead';
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

export const leadSaveSuccess = (form) => ({
    type: LEAD_SAVE_SUCCESS,
    form,
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
            toastr.success('Lead updated!');
        })
        .catch((error) => {
            dispatch(leadSaveFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Load
export const leadLoadRequest = () => ({
    type: LEADS_LOAD_REQUEST,
});

export const leadLoadSuccess = (lead) => ({
    type: LEADS_LOAD_SUCCESS,
    lead,
});

export const leadLoadFailure = (error) => ({
    type: LEADS_LOAD_FAILURE,
    error,
});

export const leadLoad = () => (dispatch) => {
    dispatch(leadLoadRequest());
    return apiLead
        .leadLoad()
        .then((lead) => {
            dispatch(leadLoadSuccess(lead));
            toastr.success(`Welcome ${(lead.name && lead.name.first) || lead.email}!`);
        })
        .catch((error) => {
            dispatch(leadLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Void
export const leadVoid = () => ({
    type: LEADS_VOID,
});
