import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../Context";

const SubNav = ()=>{
    const { id } = useParams()
    const { authUser, details } = useContext(Context);
    const [ ogCreator, setCreator ] = useState(false);

    useEffect(()=>{
        if (authUser && details && authUser.id === details.userId){
            setCreator(true);
        }
    }, [authUser, details]);

    return (
        <nav>
            <ul className="sub-nav">
                {      
                    ogCreator
                    ?   <>
                            <li className="button-nav"><Link to={`/courses/${id}/update`}>Update Course</Link></li>
                            <li className="button-nav"><Link to={`/courses/${id}/delete`}>Delete Course</Link></li>
                            <li className="button-nav"><Link to="/">Return to List</Link></li>
                        </>
                    :   <li><strong>View mode</strong></li>

                }
            </ul>
        </nav>
    );
}

export default SubNav;