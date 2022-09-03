import React, { useState } from 'react';
import Data from './Data';

export const Context = React.createContext(); 

export const Provider = (props)=>{
    const data = new Data();
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const getAllUsers = async ()=> {
        const something = await data.getAllUsers();
        return something;
    }

    const logIn = async (username, password)=>{
        data.getUser(username, password);
    }

    return (
        <Context.Provider value={
            {
                allUsers,
                isLoading,
                actions: {
                    getAllUsers,
                    setAllUsers,
                    setIsLoading,
                    logIn
                }
            }
        }>
            {props.children}
        </Context.Provider>
    );

}