import apiProfile from './apiProfile';
import apiSlug from './apiSlug';
import { authentication, leads } from './firebase';
import { LEADS } from '../js/data';

class apiLead {
    // Add
    static leadAdd = (form) =>
        leads
            .add({
                ...form,
                time: {
                    created: new Date(),
                },
            })
            .then((lead) => {
                lead.update({
                    id: lead.id,
                });
                authentication.currentUser && apiProfile.profileAuthor(LEADS, lead.id);
                apiSlug.slugAdd(lead.id, LEADS, lead.id);
                console.log('Added lead:', lead.id); // remove
            })
            .catch((error) => console.error('Error adding lead:', error)); // remove

    // Load
    static leadsLoad = () =>
        authentication.currentUser &&
        leads
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log('Leads:', snapshot.size); // remove
                // snapshot.forEach((lead) => console.log(lead.id, '=>', lead.data())); // remove
                return snapshot.docs.map((lead) => lead.data());
            })
            .catch((error) => console.error('Error getting leads:', error)); // remove
}

export default apiLead;
