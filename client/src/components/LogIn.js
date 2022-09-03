import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";
import LogInElement from "./LogInElement";

const NEUTRAL = 100;
const SUCCESS = 200;
const REDIRECT = 300
const FAILURE = 400;

const LogIn = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const { actions } = useContext(Context);
    const [flag, setFlag] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErros] = useState([]);
    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);
    
    useEffect( ()=>{
        if(flag === SUCCESS ){
            if(location.state && location.state.form){
                navigate(location.state.form);
            }else{
                // navigate('/authenticated');
                navigate('/');
            }
        } else if (flag === REDIRECT){
            navigate('/');
        }else if( flag === FAILURE ){
            navigate('/error');
        }
    } )

    const cancel = ()=>{
        setFlag(REDIRECT);
    }

    const submit = ()=>{
        console.log(`username @ time of submit: ${username}`);
        console.log(`password @ time of submit: ${password}`);
        actions.logIn(username, password)
            .then( user=>{
                console.log(user);
                if( user===null ){
                    setErros(['Sign-in was unsuccessful']);
                } else{
                    setFlag(SUCCESS);
                    console.log(`SUCCESS! ${username} is now signed in!`);
                }
            } )
            .catch( err=>{
                console.log(err);
                setFlag(FAILURE);
            } )
    }
    
    return (
        <div className="center">
        <div className="login">
            <h1>Log In</h1>
            <Form 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText={"Log In"}
                elements={ ()=>(
                    <LogInElement 
                        onUsernameChange={onUsernameChange}
                        onPasswordChange={onPasswordChange}
                    />
                ) }
            />

        </div>
        </div>
    );
}

export default LogIn;