import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
    return (
        <React.Fragment>
            <div className="flex mb-12 justify-between">
                <h1> Help Queue</h1>
              
                    <p>
                        <Link to="/">Home</Link>
                    </p>
                    <p>
                        <Link to="/sign-in">Sign In</Link>
                    </p>
              
            </div>

        </React.Fragment>
    );
}

export default Navbar;