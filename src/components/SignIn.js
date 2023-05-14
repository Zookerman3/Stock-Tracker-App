import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function SignIn() {

    const [signUpSuccess, setSignUpSuccess] = useState(null);
    const [signInSuccess, setSignInSuccess] = useState(null);
    const [signOutSuccess, setSignOutSuccess] = useState(null);

    function doSignUp(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
            })
            .catch((error) => {
                setSignUpSuccess(`There was an error signing up: ${error.message}!`)
            });
    }

    function doSignIn(event) {
        event.preventDefault();
        const email = event.target.signinEmail.value;
        const password = event.target.signinPassword.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
            })
            .catch((error) => {
                setSignInSuccess(`There was an error signing in: ${error.message}!`)
            });
    }

    // new function
    function doSignOut() {
        signOut(auth)
            .then(function () {
                setSignOutSuccess("You have successfully signed out!");
            }).catch(function (error) {
                setSignOutSuccess(`There was an error signing out: ${error.message}!`);
            });
    }

    return (
        <React.Fragment>
            <div className="mt-20 border border-red-600 flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <h1>Sign up</h1>
                {signUpSuccess}
                <div>
                    <form className="border border-red-500 w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg" onSubmit={doSignUp}>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >

                        </label>
                        <input
                            type='text'
                            name='email'
                            placeholder='email' />

                        <input
                            type='password'
                            name='password'
                            placeholder='Password' />

                        <button type='submit'>Sign up</button>
                    </form>

                    <h1>Sign In</h1>
                    <form onSubmit={doSignIn}>
                        <input
                            type='text'
                            name='signinEmail'
                            placeholder='email' />
                        <input
                            type='password'
                            name='signinPassword'
                            placeholder='Password' />
                        <button type='submit'>Sign in</button>
                    </form>

                    <h1>Sign Out</h1>
                    {signOutSuccess}
                    <br />
                    <button onClick={doSignOut}>Sign out</button>
                </div>

            </div>

        </React.Fragment>
    );
}

export default SignIn;