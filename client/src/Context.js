import React, { useState } from 'react';
import Data from './Data';

export const Context = React.createContext(); 

export const Provider = (props)=>{
    const data = new Data();

    const getAllUsers = async ()=> {
        const users = await data.getAllUsers();
        console.log(users);
        return users;
    }

    return (
        <Context.Provider value={
            {
                actions: {
                    getAllUsers
                }
            }
        }>
            {props.children}
        </Context.Provider>
    );

}