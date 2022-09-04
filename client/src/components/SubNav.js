import React from "react";
import { useParams, Link } from "react-router-dom";

const SubNav = ()=>{
    const { id } = useParams()
    return (
        <nav>
            <ul className="sub-nav">
                <li className="button-nav"><Link to={`/courses/${id}/update`}>Update Course</Link></li>
                <li className="button-nav"><Link to={`/courses/${id}/delete`}>Delete Course</Link></li>
                <li className="button-nav"><Link to="/">Return to List</Link></li>
            </ul>
        </nav>
    );
}

export default SubNav;