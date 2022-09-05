import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export const Provider = (props)=>{
    const data = new Data();
    const cookie_data_user = Cookies.get('authUser');
    const cookie_data_password = Cookies.get('password');
    const user_cookie = cookie_data_user? JSON.parse( cookie_data_user ) : null;
    const password_cookie = cookie_data_password? JSON.parse( cookie_data_password ) : null

    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [authUser, setAuthUser] = useState(user_cookie? user_cookie:null);
    const [password, setPassword] = useState(password_cookie? password_cookie:null);
    const [ details, setDetails ] = useState(null);

    const getAllUsers = async ()=> {
        const something = await data.getAllUsers();
        return something;
    }

    const logIn = async (username, password)=>{
        const user = await data.getUser(username, password);
        if(user !== null){
            setAuthUser(user);
            setPassword(password);

            Cookies.set('authUser', JSON.stringify(user), { expires: 1 });
            Cookies.set('password', password, {expires: 1});
        }
        return user;
    }

    const getCourses = async ()=>{
        const courses = await data.getCourses();
        return courses;
    }

    const getCourse = async (id)=>{
        const something = await data.getCourseById(id).then(data=>data);
        return something
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

    const updateCourse = async (id, course, user)=>{
        const response = await data.updateCourse(id, course, user);
        return response;
    }

    const deleteCourse = async (id)=>{
        console.log(id);
        const user = { username: authUser.emailAddress, password}
        const response = await data.deleteCourse(id, user);
        return (response.length===0)? 204:null;
    }
    

    return (
        <Context.Provider value={
            {
                allUsers,
                isLoading,
                authUser,
                password,
                details,
                actions: {
                    getAllUsers,
                    setAllUsers,
                    setIsLoading,
                    logIn,
                    getCourses,
                    getCourse,
                    createCourse,
                    updateCourse,
                    setDetails,
                    deleteCourse
                }
            }
        }>
            {props.children}
        </Context.Provider>
    );

}