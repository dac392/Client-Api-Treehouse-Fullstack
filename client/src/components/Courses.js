import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";

const Courses = ()=>{
    const { actions } = useContext(Context);
    
    const [ courses, setCourses ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        actions.getCourses()
            .then(response=>setCourses(response))
            .catch(error => console.log(error.messgage))
            .finally(setLoading(false));
    }, []);

    return (
        <div>
            <div>
                <ul>
                    {
                        loading
                        ? <p>Loading...</p>
                        : courses.map(course=> <li><h3>{course.title}</h3><p>{course.description}</p></li>)
                    }
                </ul>
            </div>
        </div>
    );
}

export default Courses;