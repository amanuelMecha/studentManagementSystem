import React from 'react'
export default function Student(props) {
    return (
        <div className='app.css'>

            <tr align='center'>
                Id:<td>{props.Id}</td>
                fname:<td> {props.fname}</td>
                lname:<td>{props.lname}</td>
                Major:<td> {props.major}</td>
                email:<td> {props.email}</td>
                <input onChange={props.fnameUpdate}></input>
                <td><button onClick={props.delete}>delete</button></td>

            </tr>



        </div>
    )
}