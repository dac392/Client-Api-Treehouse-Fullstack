import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../Context";

const CourseDetails = (props)=>{
    const { id } = useParams()
    const { actions } = useContext(Context);
    const [ loading, setLoading ] = useState(true);
    const [ details, setDetails ] = useState(null);

    useEffect(()=>{
        actions.getCourse(id)
            .then(res=>setDetails(res))
            .catch(err=>console.log(err.message))
            .finally(setLoading(false));
    }, []);
    return (
        <div className="page-container">
            <nav>
                <ul className="sub-nav">
                    <li className="button-nav"><Link to={`/courses/${id}/update`}>Update Course</Link></li>
                    <li className="button-nav"><Link to={`/courses/${id}/delete`}>Delete Course</Link></li>
                    <li className="button-nav"><Link to="/">Return to List</Link></li>
                </ul>
            </nav>
            {
                ( loading || !details )
                ? <p>Loading...</p>
                : <article>
                    <section>
                        <h2>Course Details</h2>
                        <p>COURSE</p>
                        <hr />
                        <h1>{details.title}</h1>
                        <p>By {details.user.firstName} {details.user.lastName}</p>
                        <p>{details.description}</p>
                    </section>
                    <section>
                        <p>ESTIMATED TIME</p>
                        <hr/>
                        {
                            (details.estimatedTime)
                            ? <p>{details.estimatedTime} hours</p>
                            : <p>Not Available</p>
                        }
                        <p>MATERIALS NEEDED</p>
                        <hr />
                        <ul>
                            {
                                details.materialsNeeded
                                ? details.materialsNeeded.map(item=><li>{item}</li>)
                                : <li>Not Available</li>
                            }
                        </ul>
                    </section>
                </article>
            }

        </div>
    );
}

export default CourseDetails;