import React, { useState } from 'react';
import Data from './Data';

export const Context = React.createContext(); 

export const Provider = (props)=>{
    const data = new Data();
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const [authUser, setAuthUser] = useState(null);

    const getAllUsers = async ()=> {
        const something = await data.getAllUsers();
        return something;
    }

    const logIn = async (username, password)=>{
        const user = await data.getUser(username, password);
        if(user !== null){
            setAuthUser(user);
        }
        return user;
    }

    const getCourses = async ()=>{
        const courses = await data.getCourses();
        return courses;
    }
    return (
        <Context.Provider value={
            {
                allUsers,
                isLoading,
                authUser,
                actions: {
                    getAllUsers,
                    setAllUsers,
                    setIsLoading,
                    setAllUsers,
                    logIn,
                    getCourses
                }
            }
        }>
            {props.children}
        </Context.Provider>
    );

}