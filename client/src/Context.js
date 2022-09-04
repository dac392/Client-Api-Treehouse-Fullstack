import React, { useState } from 'react';
import Data from './Data';

export const Context = React.createContext(); 

export const Provider = (props)=>{
    const data = new Data();
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const [authUser, setAuthUser] = useState(null);
    const [password, setPassword] = useState(null);

    const getAllUsers = async ()=> {
        const something = await data.getAllUsers();
        return something;
    }

    const logIn = async (username, password)=>{
        const user = await data.getUser(username, password);
        if(user !== null){
            setAuthUser(user);
            setPassword(password);
        }
        return user;
    }

    const getCourses = async ()=>{
        const courses = await data.getCourses();
        return courses;
    }

    const createCourse = async (title, user, password, description, estimatedTime, materialsNeeded)=>{
        if (estimatedTime.length === 0){
            estimatedTime = null;
        }
        if (materialsNeeded.length === 0){
            materialsNeeded = null;
        }
        user.password = password;
        const response = await data.createCourse({title, description, estimatedTime, materialsNeeded}, user);
        return response;
    }

    return (
        <Context.Provider value={
            {
                allUsers,
                isLoading,
                authUser,
                password,
                actions: {
                    getAllUsers,
                    setAllUsers,
                    setIsLoading,
                    setAllUsers,
                    logIn,
                    getCourses,
                    createCourse
                }
            }
        }>
            {props.children}
        </Context.Provider>
    );

}