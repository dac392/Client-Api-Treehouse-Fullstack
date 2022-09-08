import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context";
import CreateCourses from "./CreateCourses";

const UpdateCourse = ()=>{
    const navigate = useNavigate();
    const { id } = useParams();
    const { authUser, actions } = useContext(Context);
    const [ course, setCourse ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        actions.getCourse(id)
        .then(res=>{
            if(res === null){
                navigate('/notfound');
            }else if(res.userId !== authUser.id){
                navigate('/forbiden');
            }else{
                setCourse(res);
            }
        })
        .catch(err=>navigate('/error'))
        .finally(setLoading(false));
        
        
    },[]);
    return (
        loading
        ? <p>Loading...</p>
        : <CreateCourses isUpdate={true} details={course} id={id} />
    );
}

export default UpdateCourse;