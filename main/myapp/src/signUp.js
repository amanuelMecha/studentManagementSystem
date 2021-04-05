import React from 'react'

export default function Signup(props) {
    return (
        <div align='center'>
            <h4>signup form</h4>
            {/* <input name="id" placeholder='id' onChange={props.onChangeEvent}></input><br /> */}
            <input name="fname" placeholder='fname' onChange={props.onChangeEvent}></input><br />
            <input name="lname" placeholder='lname' onChange={props.onChangeEvent}></input><br />
            <input name="major" placeholder='major' onChange={props.onChangeEvent}></input><br />
            <input name="email" placeholder='email' onChange={props.onChangeEvent}></input><br />
            <input name="password" placeholder='password' onChange={props.onChangeEvent}></input><br />
            <button onClick={props.signupfunction} onChange={props.onChangeEvent}>signup page</button>
        </div>
    )
}