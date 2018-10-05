import toastr from 'toastr';
import apiCampaign from '../../../api/apiCampaign';
import { campaigns } from '../../../api/firebase';
import {
    CAMPAIGN_ADD,
    CAMPAIGN_EDIT,
    CAMPAIGN_SAVE_REQUEST,
    CAMPAIGN_SAVE_SUCCESS,
    CAMPAIGN_SAVE_FAILURE,
    CAMPAIGNS_LOAD_REQUEST,
    CAMPAIGNS_LOAD_SUCCESS,
    CAMPAIGNS_LOAD_FAILURE,
    CAMPAIGNS_VOID,
} from '../type';

toastr.options.positionClass = 'toast-top-center';

// Save
export const campaignAdd = () => ({
    type: CAMPAIGN_ADD,
});

export const campaignEdit = () => ({
    type: CAMPAIGN_EDIT,
});

export const campaignSaveRequest = () => ({
    type: CAMPAIGN_SAVE_REQUEST,
});

export const campaignSaveSuccess = () => ({
    type: CAMPAIGN_SAVE_SUCCESS,
});

export const campaignSaveFailure = (error) => ({
    type: CAMPAIGN_SAVE_FAILURE,
    error,
});

export const campaignSave = (form) => (dispatch) => {
    dispatch(campaignSaveRequest());
    return form.id
        ? apiCampaign
              .campaignEdit(form)
              .then(() => {
                  dispatch(campaignEdit());
                  dispatch(campaignSaveSuccess());
                  toastr.success('Campaign updated!');
              })
              .catch((error) => {
                  dispatch(campaignSaveFailure(error));
                  toastr.error(error.message);
                  throw error;
              })
        : apiCampaign
              .campaignAdd(form)
              .then(() => {
                  dispatch(campaignAdd());
                  dispatch(campaignSaveSuccess());
                  toastr.success('Campaign published!');
              })
              .catch((error) => {
                  dispatch(campaignSaveFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

// Load
export const campaignsLoadRequest = () => ({
    type: CAMPAIGNS_LOAD_REQUEST,
});

export const campaignsLoadSuccess = (campaigns) => ({
    type: CAMPAIGNS_LOAD_SUCCESS,
    campaigns,
});

export const campaignsLoadFailure = (error) => ({
    type: CAMPAIGNS_LOAD_FAILURE,
    error,
});

export const campaignsLoad = (watch) => (dispatch) => {
    dispatch(campaignsLoadRequest());
    return watch
        ? campaigns.orderBy('time.created', 'desc').onSnapshot(
              (snapshot) => {
                  const campaigns = snapshot.docs.map((campaign) => campaign.data());
                  dispatch(campaignsLoadSuccess(campaigns));
              },
              (error) => {
                  dispatch(campaignsLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              },
          )
        : apiCampaign
              .campaignsLoad()
              .then((campaigns) => dispatch(campaignsLoadSuccess(campaigns)))
              .catch((error) => {
                  dispatch(campaignsLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

export const campaignsLoadByUser = (user) => (dispatch) => {
    dispatch(campaignsLoadRequest());
    return apiCampaign
        .campaignsLoadByUser(user)
        .then((campaigns) => dispatch(campaignsLoadSuccess(campaigns)))
        .catch((error) => {
            dispatch(campaignsLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Void
export const campaignsVoid = () => ({
    type: CAMPAIGNS_VOID,
});
