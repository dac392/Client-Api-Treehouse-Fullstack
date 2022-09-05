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
                console.log("there was something wrong while deleting")
            }
        })
    }
    const cancel = ()=>{
        navigate(-1);
    }

    return (
        <div>
            {
                (details === null)
                ? <Navigate to="/" />
                : <Form 
                    cancel={cancel}
                    submit={submit}
                    submitButtonText={"Delete"}
                    elements={ ()=>(
                            <div className="center">
                                <label>Are you sure you want to delete {details.title}</label>
                            </div>
                            
                        )
                    }
                />
            }
        </div>
    );
}

export default Delete;