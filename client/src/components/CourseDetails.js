import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context";
import SubNav from "./SubNav";

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
        <div className="details-page">
            <SubNav />
            <h2 className="page-name">Course Details</h2>
            {
                ( loading || !details )
                ? <p>Loading...</p>
                : <article>
                    <section>
                        <p className="sub-label">COURSE</p>
                        <hr />
                        <h1 className="title">{details.title}</h1>
                        <p>By {details.user.firstName} {details.user.lastName}</p>
                        <p>{details.description}</p>
                    </section>
                    <section>
                        <p className="sub-label">ESTIMATED TIME</p>
                        <hr/>
                        {
                            (details.estimatedTime)
                            ? <p>{details.estimatedTime} hours</p>
                            : <p>Not Available</p>
                        }
                        <p className="sub-label">MATERIALS NEEDED</p>
                        <hr />
                        <ol>
                            {
                                details.materialsNeeded
                                ? details.materialsNeeded.map(item=><li>{item}</li>)
                                : <li>Not Available</li>
                            }
                        </ol>
                    </section>
                </article>
            }

        </div>
    );
}

export default CourseDetails;