import React from "react";

const SignUpElement = ({ onFNChange, onLNChange, onEmailChange, onPasswordChange })=>{
    return (
        <>
            <input type="text"
                className="login-input"
                id="firstName"
                name="firstName"
                onChange={onFNChange}
                placeholder={"First name"}
            />
            <input type="text"
                className="login-input"
                id="lastName"
                name="lastName"
                onChange={onLNChange}
                placeholder={"Last name"}
            />
            <input type="text" 
                className="login-input"
                id="emailAddress"
                name="emailAddress"
                onChange={onEmailChange}
                placeholder={"Email Address"}
            />
            <input type="password"
                className="login-input"
                id="password"
                name="password"
                onChange={onPasswordChange}
                placeholder="Password"
            />
        </>
    );
}

export default SignUpElement;