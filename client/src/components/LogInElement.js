import React from "react";

const LogInElement = ({ onUsernameChange, onPasswordChange })=>{
    return (
        <>
            <input type="text" 
                id="username"
                name="username"
                onChange={onUsernameChange}
                placeholder={"Username"}
            />
            <input type="password"
                id="password"
                name="password"
                onChange={onPasswordChange}
                placeholder="Password"

            />
        </>
    );
}

export default LogInElement;