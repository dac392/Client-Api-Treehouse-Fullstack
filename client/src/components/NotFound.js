import React from "react";
import { Link } from "react-router-dom";

const NotFound = ()=>{
    return (
        <div className="extra-container">
            <h1>Not Found</h1>
            <p>Sorry, the page that you were looking for could not be found</p>
            <Link to="/" className="page-link">Home</Link>
        </div>
    );
}

export default NotFound;