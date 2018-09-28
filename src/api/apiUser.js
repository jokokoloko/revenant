import { authentication, users } from './firebase';

class apiUser {
    // Load
    static usersLoad = () =>
        authentication.currentUser &&
        users
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log('Users:', snapshot.size); // remove
                // snapshot.forEach((user) => console.log(user.id, '=>', user.data())); // remove
                return snapshot.docs.map((user) => user.data());
            })
            .catch((error) => console.error('Error getting users:', error)); // remove
}

export default apiUser;
