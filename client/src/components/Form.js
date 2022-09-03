import React from "react";

const Form = ({ cancel, errors, submit, submitButtonText, elements })=>{

    function handleSubmit(event){
        event.preventDefault();
        submit();
    }
    function handleCancel(event){
        event.preventDefault();
        cancel();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="button-list">
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Form;