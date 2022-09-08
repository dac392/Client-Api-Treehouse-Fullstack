import React, { useContext } from "react";
import { Context } from "../Context";

/**
 * Convinience for debugging purposes
 * @returns Component containing list of users
 */
const AllUsers = ()=>{
    const { allUsers } = useContext(Context);
    return (
        <div>
            <ul>
                {
                    allUsers.map( user=> (<li key={user.id}>{`${user.firstName} ${user.lastName}`}</li> ))
                }
            </ul>
        </div>
    );
}

export default AllUsers;