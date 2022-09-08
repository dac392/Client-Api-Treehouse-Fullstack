import React from "react";
import { Link } from "react-router-dom";

const Forbiden = ()=>{
    return (
        <div className="extra-container">
            <h1>Forbiden</h1>
            <p>Sorry, you are not authorized to view this page.</p>
            <Link to="/login" className="page-link">Log In</Link>
            <Link to="/signup" className="page-link">Sign Up</Link>
        </div>
    );
}

export default Forbiden;