import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import Course from "./Course";

const Courses = ()=>{
    const { actions } = useContext(Context);
    
    const [ courses, setCourses ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const lastChild = {
        id: -1,
        text: "New Course"
    }
    useEffect(()=>{
        actions.getCourses()
            .then(response=>setCourses([...response, lastChild]))
            .catch(error => console.log(error.messgage))
            .finally(setLoading(false));
    }, []);

    return (
        <div className="courses-page">
            <ul className="course-container">
                {
                    loading
                    ? <p>Loading...</p>
                    : courses.map(course=> <Course course={course} key={course.id} /> )
                }
            </ul>
        </div>
    );
}

export default Courses;