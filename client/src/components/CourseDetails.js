import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { Context } from "../Context";
import SubNav from "./SubNav";

/**
 * 
 * @returns CourseDetails component
 */
const CourseDetails = ()=>{
    const navigate = useNavigate();
    const { id } = useParams()
    const { actions, details } = useContext(Context);
    const [ loading, setLoading ] = useState(true);

    /**
     * navigates on failure, setDetails() and setLoading() on success
     */
    useEffect(()=>{
        actions.getCourse(id)
            .then(res=>{
                if(res===null){
                    navigate('/notfound');
                }
                actions.setDetails(res)
            })
            .catch(err=>navigate('/error'))
            .finally(setLoading(false));
    }, []);
    return (
        <div className="details-page">
            <SubNav />
            <h2 className="page-name">Course Details</h2>
            {
                ( loading || details===null )
                ? <p>Loading...</p>
                : <article>
                    <section>
                        <p className="sub-label">COURSE</p>
                        <hr />
                        <h1 className="title">{details.title}</h1>
                        <p>By {details.user.firstName} {details.user.lastName}</p>
                        <ReactMarkdown children={details.description} remarkPlugins={[remarkGfm]} />
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
                        {
                            details.materialsNeeded
                            ? <ReactMarkdown children={details.materialsNeeded} remarkPlugins={[remarkGfm]} />
                            : <ol><li>Not Available</li></ol>
                        }
                        {/* <ol>
                            {
                                details.materialsNeeded
                                ? details.materialsNeeded.split(/\r?\n/).map(item=>{
                                    if(item.trim().length !== 0){
                                        return <li key={key++}>{item.trim()}</li>
                                    }
                                })
                                : <li>Not Available</li>
                            }
                        </ol> */}
                    </section>
                </article>
            }

        </div>
    );
}

export default CourseDetails;