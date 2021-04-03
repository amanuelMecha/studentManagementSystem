import React from 'react'

export default function CreateStudent(props) {
    return (
        <div>
            <h4>Create new student</h4>
            id<input onChange={props.IdOChange} />
            fname<input onChange={props.fnameOChange} />
            lname<input onChange={props.lnameOChange} />
            major <input onChange={props.majorOChange} />
            email <input onChange={props.emailOChange} />
            <b>token<input onChange={props.token}></input></b>

            <button onClick={props.addNewStudentfun} type="submit">Add new student</button>
        </div>
    )
}