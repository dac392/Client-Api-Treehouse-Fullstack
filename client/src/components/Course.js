import React from "react";
import { Link } from "react-router-dom";

/**
 * Course component
 * @param {JSON} param course information
 * @returns 
 */
const Course = ( { course } )=>{
    return (
            <li className="course">  
                {
                    course.id === -1
                    ?   <Link to="/courses/create">{course.text}</Link>
                    :   <Link to={`/courses/${course.id}`} >
                            <p>Course</p>
                            <h3>{course.title}</h3>
                        </Link>    
                }
            </li>
    );
} 

export default Course;