import React, { useState } from "react";
import SignUpElement from "./SignUpElement";
import Form from "./Form";

const NEUTRAL = 100;
const SUCCESS = 200;
const REDIRECT = 300
const FAILURE = 400;

const SignUp = ()=>{

    const [ flag, setFlag ] = useState(NEUTRAL);


    const onFNChange = (e)=>{e.preventDefault()}
    const onLNChange = (e)=>{e.preventDefault()}
    const onEmailChange = (e)=>{e.preventDefault()}
    const onPasswordChange = (e)=>{e.preventDefault()}

    const submit = ()=>{

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