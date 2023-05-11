import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
    return (
        <React.Fragment>
            <div className="fixed top-0 left-0 pr-10 w-screen flex mb-12 justify-between bg-slate-400 h-20">
                <div className="flex items-center pl-10">
                    <h1 className="text-xl">SZ Stock Tracker</h1>
                </div>
                <div className="flex items-center justify-end w-1/2 pr-10">
                    <div className="flex space-x-4">
                        <p>
                            <Link to="/">Home</Link>
                        </p>
                        <p>
                            <Link to="/sign-in">Sign In</Link>
                        </p>
                        <p>Account</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Navbar;