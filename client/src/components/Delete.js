import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";

const Delete = ()=>{
    const navigate = useNavigate();
    const { actions, details, setDetails } = useContext(Context);
    const { id } =  useParams();

    const submit = (e)=>{
        actions.deleteCourse(id).then(res=>{
            console.log(res);
            if (res===204){
                navigate('/');
            }else{
                navigate('/error')
            }
        })
    }
    const cancel = ()=>{
        navigate(-1);
    }

    return (
        <div className="delete--container">
            {
                (details === null)
                ? <Navigate to="/" />
                : <Form 
                    cancel={cancel}
                    submit={submit}
                    errors={[]}
                    submitButtonText={"Delete"}
                    elements={ ()=>(
                            <div className="center">
                                <label>Are you sure you want to delete course: <strong>{details.title}</strong></label>
                            </div>
                            
                        )
                    }
                />
            }
        </div>
    );
}

export default Delete;