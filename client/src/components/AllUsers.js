import React, { useContext } from "react";
import { Context } from "../Context";

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