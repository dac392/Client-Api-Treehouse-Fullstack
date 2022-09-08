import React from "react";
import { Link } from "react-router-dom";

const Error = ()=>{
    return (
        <div className="extra-container">
            <h1>Error</h1>
            <p>Oh no, something seems to have gone wrong.</p>
            <Link to="/" className="page-link">Home</Link>
        </div>
    );
}

export default Error;