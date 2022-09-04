import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context";
import CreateCourses from "./CreateCourses";

const UpdateCourse = ()=>{
    const { id } = useParams();
    const { actions } = useContext(Context);
    const [ course, setCourse ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        actions.getCourse(id)
            .then(res=>setCourse(res))
            .catch(err=>console.log(err.message))
            .finally(setLoading(false));
        
    },[]);
    return (
        loading
        ? <p>Loading...</p>
        : <CreateCourses isUpdate={true} details={course} id={id} />
    );
}

export default UpdateCourse;