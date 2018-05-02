import delay from './delay'; // remove later and remove delay from all functions
import { authentication, users } from './firebase';

class apiAccount {
    // Check
    static accountCheck = () =>
        // remove Promise (maybe)
        new Promise((resolve, reject) =>
            // remove setTimeout
            setTimeout(() => {
                // we need a similar function in Azure Search
                const unsub = authentication.onAuthStateChanged(
                    (user) => {
                        unsub();
                        resolve(user);
                        user
                            ? console.log(`User: ${user.email}`) // remove
                            : console.log('User: guest'); // remove
                    },
                    (error) => reject(error),
                );
                console.log('Account checked.'); // remove
            }, delay),
        );

    // Register
    static accountRegister = (user) =>
        authentication.createUserWithEmailAndPassword(user.email, user.password).then(
            (user) =>
                users
                    .add({
                        uid: user.uid,
                        email: user.email,
                    })
                    .then((user) => console.log('Added user with ID:', user.id)) // remove
                    .catch((error) => console.error('Error adding user:', error)), // remove
        );

    // Reset Password
    static accountResetPassword = (user) => authentication.sendPasswordResetEmail(user.email);

    // Log In
    static accountLogIn = (user) => authentication.signInWithEmailAndPassword(user.email, user.password);

    // Log Out
    static accountLogOut = () => authentication.signOut();
}

export default apiAccount;
