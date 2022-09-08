import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

const Forbiden = ()=>{
    const { authUser } = useContext(Context);
    return (
        <div className="extra-container">
            <h1>Forbiden</h1>
            <p>Sorry, you are not authorized to view this page.</p>
            {
                (authUser === null)
                ? <>
                    <Link to="/login" className="page-link">Log In</Link>
                    <Link to="/signup" className="page-link">Sign Up</Link>
                </>
                : <Link to="/" className="page-link">Home</Link>
            }
        </div>
    );
}

export default Forbiden;