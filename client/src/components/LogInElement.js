import React from "react";

const LogInElement = ({ onUsernameChange, onPasswordChange })=>{
    return (
        <>
            <input type="text" 
                className="login-input"
                id="username"
                name="username"
                onChange={onUsernameChange}
                placeholder={"Username"}
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

export default LogInElement;