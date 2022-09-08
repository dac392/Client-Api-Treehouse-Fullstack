import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import Course from "./Course";

const Courses = ()=>{
    const navigate = useNavigate();
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
            .catch(error => navigate('/error'))
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