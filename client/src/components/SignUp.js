import React, { useContext, useEffect, useState } from "react";
import SignUpElement from "./SignUpElement";
import Form from "./Form";
import { Context } from "../Context";
import { useLocation, useNavigate } from "react-router-dom";

const NEUTRAL = 100;
const SUCCESS = 200;
const REDIRECT = 300
const FAILURE = 400;

const SignUp = ()=>{
    // Context / set up
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const location = useLocation();

    // State
    const [ firstName, setfName ] = useState('');
    const [ lastName, setlName ] = useState('');
    const [ emailAddress, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ flag, setFlag ] = useState(NEUTRAL);
    const [ errors, setErros ] = useState([]); 


    const onFNChange = (e)=>{ setfName(e.target.value) }
    const onLNChange = (e)=>{ setlName(e.target.value) }
    const onEmailChange = (e)=>{ setEmail(e.target.value) }
    const onPasswordChange = (e)=>{ setPassword(e.target.value) }

    useEffect(()=>{
        if(flag === SUCCESS ){
            if(location.state && location.state.form){
                navigate(location.state.form);
            }else{
                navigate('/');
            }
        } else if (flag === REDIRECT){
            navigate('/');
        }else if( flag === FAILURE ){
            navigate('/error');
        }
    }, [flag]);

    const submit = ()=>{
        const user = { firstName, lastName, emailAddress, password };
        actions.signUp(user)            
        .then( ({ status, errors })=>{
            if( status !== 201 ){
                errors.then(errs=>setErros(errs));

            } else{
                setFlag(SUCCESS);
            }
        } )
        .catch( err=>{
            setFlag(FAILURE);
        } )
    }
    const cancel = ()=>{
        setFlag(REDIRECT);
    }
    return (
        <div className="center">
            <div className="login">
                <h1>Sign Up</h1>
                <Form 
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText={"Sign Up"}
                    elements={ ()=>(
                        <SignUpElement
                            onFNChange={onFNChange}
                            onLNChange={onLNChange}
                            onEmailChange={onEmailChange}
                            onPasswordChange={onPasswordChange}
                        />
                    ) }
                />
            </div>
        </div>
    );
}

export default SignUp;