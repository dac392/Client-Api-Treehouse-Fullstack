import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

const NEUTRAL = 100;
const SUCCESS = 200;
const REDIRECT = 300
const FAILURE = 400;

const CreateCourses = ()=>{
    const navigate = useNavigate();

    const { authUser, password, actions } = useContext(Context);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setTime ] = useState('');
    const [ materialsNeeded, setMaterials ] = useState('');
    const [ flag, setFlag ] = useState(NEUTRAL);

    const onTitleChange = (e)=>setTitle(e.target.value);
    const onDescriptionChange = (e)=>setDescription(e.target.value);
    const onTimeChange = (e)=>setTime(e.target.value);
    const onMaterialsChange = (e)=>setMaterials(e.target.value);

    useEffect(()=>{
        if(flag === SUCCESS ){
            navigate('/');
        } else if (flag === REDIRECT){
            navigate('/');
        }else if( flag === FAILURE ){
            navigate('/error');
        }
    }, [flag]);


    const submit = (e)=>{
        e.preventDefault();
        console.log(`${title} ${description} ${estimatedTime} ${materialsNeeded}`);
        actions.createCourse(title, authUser, password, description, estimatedTime, materialsNeeded)
        .then( response => {
            if (response !== null){
                setFlag(SUCCESS);
            }else{
                setFlag(FAILURE);
            }
        })
        .catch( err=>{
            console.log(err);
            setFlag(FAILURE);
        } );
    }


    return (
        <div className="page-container">
            <h1>Create Course</h1>
            <form onSubmit={submit}>
                <fieldset>
                    <label>
                        Course Title:
                        <input 
                            className="course-input"
                            type="text"
                            id="course-title"
                            name="course-title"
                            onChange={onTitleChange}
                        />
                    </label>
                    <label>By {authUser.firstName} {authUser.lastName}</label>
                    <label>
                        Course Description
                        <textarea onChange={onDescriptionChange} />
                    </label>
                    <div className="buttons-container">
                        <button className="button small" type="submit">Submit</button>
                        <button className="button small">cancel</button>
                    </div>
                </fieldset>

                <fieldset>
                    <label>
                        Estimated Time
                        <input 
                            className="course-input" 
                            type="text" 
                            id="estimated-time" 
                            name="estimated-time" 
                            onChange={onTimeChange}
                        />
                    </label>
                    <label>
                        Materials Needed
                        <textarea onChange={onMaterialsChange} />
                    </label>
                </fieldset>
            </form>
        </div>
    );
}

export default CreateCourses;