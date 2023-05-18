import React, { useState } from "react";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function SignIn() {
    const [signUpSuccess, setSignUpSuccess] = useState(null);
    const [signInSuccess, setSignInSuccess] = useState(null);
    const [signOutSuccess, setSignOutSuccess] = useState(null);
    const [isSignInVisible, setIsSignInVisible] = useState(false);

    function doSignUp(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`);
                setSignUpSuccess(null);
            })
            .catch((error) => {
                setSignUpSuccess(`There was an error signing up: ${error.message}!`);
            });
    }

    function doSignIn(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
            })
            .catch((error) => {
                setSignInSuccess(`There was an error signing in: ${error.message}!`)
            });
    }

    function doSignOut() {
        signOut(auth)
            .then(function () {
                setSignOutSuccess("You have successfully signed out!");
            }).catch(function (error) {
                setSignOutSuccess(`There was an error signing out: ${error.message}!`);
            });
    }

    if (isSignInVisible === true) {
        return (
            <React.Fragment>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                    <div className="max-w-md w-full px-6 py-4 mt-20 bg-white shadow-md rounded-lg">
                        <h1 className="text-center mb-6 text-2xl font-bold">Sign In</h1>
                        {signInSuccess}
                        <form onSubmit={doSignIn}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    E-Mail
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-slate"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-slate"
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    className=" inline-flex px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                    <br></br>
                    {signOutSuccess}
                    <br />
                    <button onClick={doSignOut}>Sign out</button>
                </div >
            </React.Fragment >
        );
    } else if (isSignInVisible === false) { // Render sign-up form
        return (
            <React.Fragment>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                    <div className="max-w-md w-full px-6 py-4 mt-20 bg-white shadow-md rounded-lg">
                        <h1 className="text-center mb-6 text-2xl font-bold">Sign up</h1>
                        {signUpSuccess}
                        <form onSubmit={doSignUp}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    E-Mail
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-slate"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-slate"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="text-sm text-gray-600 underline hover:text-gray-900"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setIsSignInVisible(!isSignInVisible)
                                    }
                                    }
                                    // Toggle the value of isSignInVisible
                                    type="button"
                                >
                                    Already registered?
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-white hover:text-gray-900 active:bg-gray-900"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                    <br></br>
                    {signOutSuccess}
                    <br />
                    <button className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-white hover:text-gray-900 active:bg-gray-900" onClick={doSignOut}>Sign out</button>
                </div>
            </React.Fragment>
        );
    }
    // } else (auth.currentUser !== null) {
    //     return (
    //         <React.Fragment>
    //             <h1>Sign Out</h1>
    //             {signOutSuccess && <p>{signOutSuccess}</p>}
    //             <br />
    //             <button onClick={doSignOut}>Sign out</button>
    //         </React.Fragment>
    //     );
    // }
}

export default SignIn;