import apiProfile from './apiProfile';
import apiSlug from './apiSlug';
import { authentication, campaigns } from './firebase';
import { CAMPAIGNS, PUBLISHED } from '../js/data';

class apiCampaign {
    // Add
    static campaignAdd = (form) =>
        authentication.currentUser &&
        campaigns
            .add({
                ...form,
                user: authentication.currentUser.uid,
                status: PUBLISHED,
                time: {
                    created: new Date(),
                },
            })
            .then((campaign) => {
                campaign.update({
                    id: campaign.id,
                });
                apiProfile.profileAuthor(CAMPAIGNS, campaign.id);
                apiSlug.slugAdd(campaign.id, CAMPAIGNS, campaign.id);
                apiSlug.slugAdd(form.slug, CAMPAIGNS, campaign.id);
                console.log('Added campaign:', campaign.id); // remove
            })
            .catch((error) => console.error('Error adding campaign:', error)); // remove

    // Edit
    static campaignEdit = (form) =>
        authentication.currentUser.uid === form.user &&
        campaigns
            .doc(form.id)
            .update({
                ...form,
                'time.edited': new Date(),
            })
            .then(() => {
                apiSlug.slugAdd(form.slug, CAMPAIGNS, form.id);
                console.log('Edited campaign:', form.id); // remove
            })
            .catch((error) => console.error('Error editing campaign:', error)); // remove

    // Load
    static campaignsLoad = () =>
        campaigns
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log('Campaigns:', snapshot.size); // remove
                // snapshot.forEach((campaign) => console.log(campaign.id, '=>', campaign.data())); // remove
                return snapshot.docs.map((campaign) => campaign.data());
            })
            .catch((error) => console.error('Error getting campaigns:', error)); // remove

    static campaignsLoadByUser = (user) =>
        campaigns
            .where('user', '==', user)
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log('Campaigns by user:', snapshot.size); // remove
                // snapshot.forEach((campaign) => console.log(campaign.id, '=>', campaign.data())); // remove
                return snapshot.docs.map((campaign) => campaign.data());
            })
            .catch((error) => console.error('Error getting campaigns by user:', error)); // remove
}

export default apiCampaign;
