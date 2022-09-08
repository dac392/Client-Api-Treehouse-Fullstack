import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

import ErrorsDisplay from "./ErrorsDisplay";

const NEUTRAL = 100;
const SUCCESS = 200;
const REDIRECT = 300
const FAILURE = 400;

const CreateCourses = ({ isUpdate, details, id })=>{
    const navigate = useNavigate();
    const { authUser, password, actions } = useContext(Context);

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ estimatedTime, setTime ] = useState("");
    const [ materialsNeeded, setMaterials ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const [ flag, setFlag ] = useState(NEUTRAL);

    const onTitleChange = (e)=>setTitle(e.target.value);
    const onDescriptionChange = (e)=>setDescription(e.target.value);
    const onTimeChange = (e)=>setTime(e.target.value);
    const onMaterialsChange = (e)=>setMaterials(e.target.value);

    useEffect(()=>{
        if(flag === NEUTRAL && details){
            setTitle(details.title !== null? details.title : "")
            setDescription(details.description !== null? details.description : "")
            setTime(details.estimatedTime !== null? details.estimatedTime : "")
            setMaterials(details.materialsNeeded !== null? details.materialsNeeded:"")
        }else if(flag === SUCCESS ){
            navigate('/');
        } else if (flag === REDIRECT){
            navigate(`/courses/${id}`);
        }else if( flag === FAILURE ){
            navigate('/error');
        }
    }, [flag, details]);

    const cancel = (e)=>{
        e.preventDefault();
        if(isUpdate){
            navigate(-1);
        }else{
            setFlag(SUCCESS);
        }
    }

    const submit = (e)=>{
        e.preventDefault();
        if(isUpdate){
            const course = {
                title, 
                description, 
                estimatedTime:estimatedTime.length>0? estimatedTime:null,
                materialsNeeded: materialsNeeded.length>0? materialsNeeded:null
            }
            const user = {username: authUser.emailAddress, password};
            actions.updateCourse(id, course, user)
                .then(({status, errors})=>{
                    if (status === 204){
                        setFlag(REDIRECT);
                    }else{
                        setErrors(errors);
                    }
                }).catch(err=> setFlag(FAILURE));
        }else{
            actions.createCourse(title, authUser, password, description, estimatedTime, materialsNeeded)
            .then( ({status, errors}) => {
                if (status === 201){
                    setFlag(SUCCESS);
                }else{
                    setErrors(errors);
                }
            })
            .catch( err=>{
                console.log(err);
                setFlag(FAILURE);
            } );
        }
    }


    return (
        <div className="page-container">
            <h1>Create Course</h1>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={submit}>
                <div className="field--container">
                    <fieldset>
                        <label>
                            Course Title:
                            <input 
                                className="course-input"
                                type="text"
                                id="title"
                                name="title"
                                onChange={onTitleChange}
                                value={title}
                            />
                        </label>
                        <label>By {authUser.firstName} {authUser.lastName}</label>
                        <label>
                            Course Description
                            <textarea 
                                onChange={onDescriptionChange} 
                                name="description" 
                                value={description} 

                            />
                        </label>
                    </fieldset>

                    <fieldset>
                        <label>
                            Estimated Time
                            <input 
                                className="course-input" 
                                type="text" 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                onChange={onTimeChange}
                                value={estimatedTime}
                            />
                        </label>
                        <label>
                            Materials Needed
                            <textarea 
                                onChange={onMaterialsChange} 
                                name="materialsNeeded" 
                                value={materialsNeeded}
                            />
                        </label>
                    </fieldset>
                </div>
                <div className="buttons-container">
                        <button className="button small" type="submit">Submit</button>
                        <button className="button small" onClick={cancel}>cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateCourses;