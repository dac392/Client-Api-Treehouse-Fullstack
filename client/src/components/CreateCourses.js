import React, { useContext } from "react";
import { Context } from "../Context";

const CreateCourses = ()=>{
    const { authUser } = useContext(Context);

    return (
        <div className="page-container">
            <h1>Create Course</h1>
            <form>
                <fieldset>
                    <label>
                        Course Title:
                        <input 
                            className="course-input"
                            type="text"
                            id="course-title"
                            name="course-title"
                        />
                    </label>
                    <label>By {authUser.firstName} {authUser.lastName}</label>
                    <label>
                        Course Description
                        <textarea />
                    </label>
                    <div className="buttons">
                        <button>Submit</button>
                        <button>cancel</button>
                    </div>
                </fieldset>
                <fieldset>
                    <label>
                        Estimated Time
                        <input className="course-input" type="text" id="estimated-time" name="estimated-time" />
                    </label>
                    <label>
                        Materials Needed
                        <textarea />
                    </label>
                </fieldset>
            </form>
        </div>
    );
}

export default CreateCourses;